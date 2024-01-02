import React from "react";
import { imageUrl } from "@/config/apiUrl";
import Link from "next/link";
import { checkEnvironment } from "@/config/apiUrl";

async function getAdopter() {
  const res = await fetch(`${checkEnvironment()}/api/adopter`, {
    cache: "no-store",
  });
  const data = await res.json();
  return data;
}

const getUser = async (x) => {
  const res = await fetch(`${checkEnvironment()}/api/users/${x}`);
  const user = await res.json();

  return user;
};

export const PetsAvailable = async({ pets}) => {
  const availablePets = pets.filter((pet) => pet.isAdopted === false);
  const {adopters} = await getAdopter();
  return (
    <>
      <h2 id="pets" className="my-5">
        <span className="text-ungu">Pets</span> Available
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 my-20">
        {availablePets.map(async(pet, index) => {
          let imageSize = "tr:w-300,h-200";
          let image = `${imageUrl}/${imageSize}/pets/${pet.id}/${pet.images[0]}`;
          const userLocation = await getUser(pet.userId);
          const petId = pet.id;

          const filterDataByPetId = (adopters) => {
            return adopters.filter((item) => item.petId === petId);
          };
          const potentialAdopter = filterDataByPetId(adopters);
          console.log(potentialAdopter);

          return (
            <div key={index} className="bg-white rounded-3xl border shadow-lg hover:scale-105 transition-all ease-in duration-100 cursor-pointer">
              <Link href={`/pets/${pet.id}`}>
                <img
                  src={image}
                  alt="pet"
                  className="w-full h-auto rounded-t-3xl"
                  width={300}
                  height={200}
                />
              </Link>
              <section className="p-7 gap-8 flex flex-col justify-between">
                <div className="space-y-1">
                  <h2 className="text-3xl">
                    <Link href={`/pets/${pet.id}`}>{pet.name}</Link>
                  </h2>
                  <p className="text-gray-500 thin-text">{pet.description}</p>
                  <p>{userLocation.user["domicile"]}</p>
                </div>
                <p className="text-gray-500 thin-text">
                  Potential Adopter:{` ${potentialAdopter.length}`}
                  <span className="font-bold">{pet.potentialAdopter}</span>
                </p>
              </section>
            </div>
          );
        })}
      </div>
    </>
  );
};
