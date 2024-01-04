import React from "react";
import { imageUrl } from "@/config/apiUrl";
import { checkEnvironment } from "@/config/apiUrl";
import { CardPet } from "../pets/components/CardPet";

const getUser = async (x) => {
  const res = await fetch(`${checkEnvironment()}/api/users/${x}`, {
    cache: "force-cache",
  });
  const user = await res.json();

  return user;
};

export const PetsAvailable = ({ pets, adopters }) => {
  const availablePets = pets.filter((pet) => pet.isAdopted === false);

  return (
    <>
      <h2 id="pets">
        <span className="text-ungu">Pets</span> Available
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10 mb-20">
        {availablePets.map(async (pet, index) => {
          let imageSize = "tr:w-300,h-200";
          let image = `${imageUrl}/${imageSize}/pets/${pet.id}/${pet.images[0]}`;
          const userLocation = await getUser(pet.userId);
          const petId = pet.id;

          const filterDataByPetId = (adopters) => {
            return adopters.filter((item) => item.petId === petId);
          };
          const potentialAdopter = filterDataByPetId(adopters);

          return (
            <CardPet index={index} pet={pet} image={image} userLocation={userLocation} potentialAdopter={potentialAdopter}/>
          );
        })}
      </div>
    </>
  );
};
