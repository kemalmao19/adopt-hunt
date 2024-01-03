"use client";
import React from "react";
import { Pencil } from "lucide-react";
import { Trash2 } from "lucide-react";
import { Eye } from "lucide-react";
import { imageUrl } from "@/config/apiUrl";
import Link from "next/link";
import { checkEnvironment } from "@/config/apiUrl";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Image,
  Chip,
} from "@nextui-org/react";

const deletePet = async (id) => {
  const res = await fetch(`/api/pets/${id}`, {
    method: "DELETE",
  });
  const data = await res.json();
  window.location.reload();
  return data;
};

async function getAdopter() {
  const res = await fetch(`${checkEnvironment()}/api/adopter/`, {
    cache: "no-cache",
  });
  const data = await res.json();
  return data;
}

export const MyPets = async ({ pets }) => {
  const { adopters } = await getAdopter();

  return (
    <>
      <h2 id="pets" className="my-5">
        <span className="text-ungu">My</span> Pets
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 my-20">
        {pets.map((pet, index) => {
          let imageSize = "tr:w-300,h-200";
          let image = `${imageUrl}/${imageSize}/pets/${pet.id}/${pet.images[0]}`;
          const petId = pet.id;

          const filterDataByPetId = (adopters) => {
            return adopters.filter((item) => item.petId === petId);
          };
          const potentialAdopter = filterDataByPetId(adopters);

          return (
            <Card className="card-pet h-full" key={index}>
              <CardHeader className="p-0">
                <Link href={`/dashboard/pets/${pet.id}`}>
                  <Image
                    alt={pet.name}
                    className="object-cover"
                    src={image}
                    width={700}
                    height={100}
                  />
                </Link>
              </CardHeader>
              <CardBody className="flex flex-col h-full justify-between p-5">
                <h2 className="text-2xl leading-[1.2] capitalize">
                  <Link href={`/dashboard/pets/${pet.id}`}>{pet.name}</Link>
                </h2>
                <div>
                  <p className="text-gray-400 thin-text text-sm mb-3">
                    {pet.description}
                  </p>
                </div>

                {pet.isAdopted ? (
                  <div className="thin-text text-orange-500">Adopted</div>
                ) : (
                  <p className="text-gray-500 thin-text">
                    Potential Adopter:{` ${potentialAdopter.length}`}
                    <span className="font-bold">{pet.potentialAdopter}</span>
                  </p>
                )}
              </CardBody>
              <Divider />
              <CardFooter className="p-5">
                <div className="flex justify-between items-center w-full">
                  <div className="flex space-x-4">
                    <Link href={`/dashboard/pets/update/${pet.id}`}>
                      <Pencil
                        strokeWidth={3}
                        className="cursor-pointer hover:scale-110"
                        color="green"
                      />
                    </Link>
                    <Trash2
                      strokeWidth={3}
                      className="cursor-pointer hover:scale-110"
                      color="red"
                      onClick={() => deletePet(pet.id)}
                    />
                  </div>
                  <Link href={`/dashboard/pets/${pet.id}`}>
                    <Eye
                      strokeWidth={3}
                      className="cursor-pointer hover:scale-110"
                    />
                  </Link>
                </div>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </>
  );
};
