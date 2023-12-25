import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";

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
