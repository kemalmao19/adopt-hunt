import React from "react";
import { imageUrl } from "@/config/apiUrl";

export const PetsAvailable = ({ pets }) => {
  const availablePets = pets.filter((pet) => pet.isAdopted === false);
  return (
    <>
      <h2 className="my-5">
        <span className="text-ungu">Pets</span> Available
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 my-20">
        {availablePets.map((pet, index) => {
          let imageSize = "tr:w-300,h-200";
          let image = `${imageUrl}/${imageSize}/pets/${pet.id}/${pet.images[0]}`;

          return (
            <div key={index} className="bg-white rounded-3xl border shadow-lg">
              <img
                src={image}
                alt="pet"
                className="w-full h-auto rounded-t-3xl"
                width={300}
                height={200}
              />
              <section className="p-7 gap-8 flex flex-col justify-between">
                <div className="space-y-1">
                  <h2 className="text-3xl">{pet.name}</h2>
                  <p className="text-gray-500 thin-text">{pet.description}</p>
                </div>
                <p className="text-gray-500 thin-text">
                  Potential Adopter:{" "}
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
