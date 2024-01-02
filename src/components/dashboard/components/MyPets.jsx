"use client";
import React from "react";
import { Pencil } from "lucide-react";
import { Trash2 } from "lucide-react";
import { Eye } from "lucide-react";
import { imageUrl } from "@/config/apiUrl";
import Link from "next/link";
import { checkEnvironment } from "@/config/apiUrl";

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
    cache: "no-store",
  });
  const data = await res.json();
  return data;
}

export const MyPets = async({ pets }) => {
  const { adopters } = await getAdopter();

  return (
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
          <div key={index} className="bg-white rounded-3xl border shadow-lg">
            <img
              src={image}
              alt="pet"
              className="w-full h-auto rounded-t-3xl"
              width={300}
              height={200}
            />
            <section className="p-7 flex flex-col gap-8">
              <div className="space-y-1">
                <h2 className="text-3xl">{pet.name}</h2>
                <p className="text-gray-500 thin-text">{pet.description}</p>
              </div>
              {pet.isAdopted ? (
                <div className="thin-text text-orange-500">Adopted</div>
              ) : (
                <p className="text-gray-500 thin-text">
                  Potential Adopter:{` ${potentialAdopter.length}`}
                  <span className="font-bold">{pet.potentialAdopter}</span>
                </p>
              )}
            </section>
            <section className="flex justify-between items-center px-7 py-4 border-t-2 border-gray-200">
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
            </section>
          </div>
        );
      })}
    </div>
  );
};
