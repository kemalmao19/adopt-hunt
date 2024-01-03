//fetch pet information
import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";
import { uploadFile } from "@/lib/uploadFile";

export async function GET(request, { params }) {
  const { id } = params;
  const pet = await prisma.pet.findUnique({
    where: {
      id,
    },
  });
  return NextResponse.json({ pet }, { status: 200 });
}

export async function PUT(request, { params }) {
  const formData = await request.formData();
  const petIdToUpdate = params.id;
  const images = formData.getAll("images");

  let allImages = [];
  images.forEach((x) => {
    allImages.push(x.name);
  });

  const updatedPetData = {
    name: formData.get("name"),
    images: allImages,
    description: formData.get("description"),
    breed: formData.get("breed"),
    category: formData.get("category"),
    gender: formData.get("gender"),
    health_status: formData.get("healthStatus"),
    age: Number(formData.get("age")),
    isAdopted: Boolean(formData.get("isAdopted")),
  };

  try {
    // Update only the provided fields
    const updatedFields = {};
    for (const key in updatedPetData) {
      if (
        updatedPetData[key] !== undefined &&
        updatedPetData[key] !== null
      ) {
        updatedFields[key] = updatedPetData[key];
      }
    }

    // Get the current pet data from the database
    const currentPetData = await prisma.pet.findUnique({
      where: {
        id: petIdToUpdate,
      },
    });

    // Initialize mergedData with currentPetData
    let mergedData = { ...currentPetData, ...updatedFields };

    for (const key in updatedFields) {
      if (updatedFields[key] !== null && updatedFields[key] !== undefined) {
        // Handle 'images' field separately to retain the current value if empty in updatedFields
        if (key === "images" && updatedFields[key].length === 0) {
          // If 'images' in updatedFields is empty, retain the current value
          mergedData[key] = currentPetData[key];
        } else {
          mergedData[key] = updatedFields[key];
        }
      }
    }

    // Update the pet's data in the database
    const updatedPet = await prisma.pet.update({
      where: {
        id: petIdToUpdate,
      },
      data: mergedData,
    });

    // Send Image ke AWS S3
    try {
      // Upload images file
      images.forEach(async (item) => {
        const uploadFeaturedImage = await uploadFile({
          Body: item,
          Key: item.name,
          ContentType: item.type,
          Dir: `pets/${petIdToUpdate}`,
        });
        console.log(uploadFeaturedImage);
      });
    } catch (error) {
      console.log(error);
    }
    return NextResponse.json(
      {
        message: "Pet updated successfully",
        updatedPet,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Failed to update pet",
      },
      { status: 500 }
    );
  }
}

// delete pet information by id
export async function DELETE(request, { params }) {
  const { id } = params;
  const pet = await prisma.pet.delete({
    where: {
      id,
    },
  });
  return NextResponse.json({ pet }, { status: 200 });
}
