import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";
import {verify} from "jsonwebtoken";
import { cookies } from "next/headers";
import slugify from "slugify";
import { uploadFile } from "@/lib/uploadFile";

export async function GET(request) {
  try {
    const queryParams = request.nextUrl.searchParams;
    const query = queryParams.get("q");
    const domicile = queryParams.get("domicile");
    const category = queryParams.get("category");

    let pets = null;

    if (!(domicile || category || query)) {
      pets = await prisma.pet.findMany();
    }

    if (domicile && !category) {
      pets = await prisma.user.findMany({
        include: {
          pets: true,
        },
        where: {
          domicile,
        },
      });
      if (pets) {
        const allPets = pets[0].pets;
        return NextResponse.json({ allPets }, { status: 200 });
      } else {
        return NextResponse.json({ userPet: [] }, { status: 200 });
      }
    } else if (!domicile && category) {
      pets = await prisma.pet.findMany({
        where: {
          category: {
            contains: category,
          },
        },
      });
      if (pets) {
        return NextResponse.json({ pets }, { status: 200 });
      } else {
        return NextResponse.json({ pets: [] }, { status: 200 });
      }
    } else if (domicile && category) {
      const usersWithDomicileAndPetsInCategory = await prisma.user.findMany({
        where: {
          domicile,
          pets: {
            some: {
              category: {
                contains: category,
              },
            },
          },
        },
        include: {
          pets: {
            where: {
              category: {
                contains: category,
              },
            },
          },
        },
      });

      const allPets = usersWithDomicileAndPetsInCategory.flatMap(
        (user) => user.pets
      );
      return NextResponse.json({ pets: allPets }, { status: 200 });
    } else if (query) {
      pets = await prisma.pet.findMany({
        where: {
          OR: [
            {
              name: {
                contains: query,
                mode: "insensitive",
              },
            },
            {
              description: {
                contains: query,
                mode: "insensitive",
              },
            },
          ],
        },
      });

      if (pets) {
        return NextResponse.json({ pets }, { status: 200 });
      } else {
        return NextResponse.json({ pets: [] }, { status: 200 });
      }
    }
  } catch (error) {
    console.error("Error in GET request:", error);
    return NextResponse.json(
      { message: "Failed to process the request." },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  const formData = await request.formData();
  const name = formData.get("name");
  const image = formData.getAll("image");
  const description = formData.get("description");
  const breed = formData.get("breed");
  const category = formData.get("category");
  const gender = formData.get("gender");
  const health_status = formData.get("health_status");
  const age = formData.get("age");
  const isAdopted = formData.get("isAdopted");

  //get userId from token
  const cookieStore = cookies();
  const token = cookieStore.get("token").value;
  const decoded = verify(token, process.env.JWT_SECRET);
  const userId = decoded.id;

  let petId = "";
  // save pet to database
  try {
    const allImages = [];
    image.forEach((x) => { allImages.push(x.name) });

    const addPet = await prisma.pet.create({
      data: {
        name,
        slug: slugify(name, { lower: true, replacement: "-" }),
        image: allImages,
        description,
        breed,
        category,
        gender,
        health_status,
        age: Number(age),
        isAdopted: Boolean(isAdopted),
        userId,
      },
    });

    petId = addPet.id;
    console.log(addPet);
  } catch (error) {
    console.log(error);
  }
  // Send Image ke AWS S3
  try {
     // Upload images file
    image.forEach(async (item) => {
      const uploadFeaturedImage = await uploadFile({
        Body: item,
        Key: item.name,
        ContentType: item.type,
        Dir: `pets/${petId}`,
      });
      console.log(uploadFeaturedImage);
    });
  } catch (error) {
    console.log(error);
  }
  return NextResponse.json(
    {
      message: "Add Pet successfully",
    },
    { status: 201 }
  );
}
