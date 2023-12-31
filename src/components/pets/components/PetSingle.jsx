import React from "react";
import { Image } from "@nextui-org/react";
import { imageUrl } from "@/config/apiUrl";

export const PetSingle = ({ pet }) => {
  const petImages = pet.images;
  //   console.log(petImages);

  return (
    <>
      <h1 className="mt-5 mb-10 capitalize">{pet.name}</h1>
      <div className="pet-images grid grid-cols-4 gap-5 mb-10">
        {petImages.map((image, index) => {
          return (
            <Image
              key={index}
              alt={pet.name}
              width={300}
              height={300}
              src={`${imageUrl}/tr:h-500/pets/${pet.id}/${image}`}
            />
          );
        })}
      </div>
      <div className="grid grid-cols-3">
        {/* LEFT */}
        <div className="col-span-2">
          {/* ABOUT */}
          <div className="p-5 rounded-2xl shadow-md">
            <h2 className="mb-2">About pet</h2>
            <div className="space-x-5 text-gray-400 text-sm font-jua">
              <span>{pet.category}</span>
              <span>{pet.age} y.o.</span>
              <span>{pet.gender}</span>
            </div>
            <p className="mt-5 mb-10 capitalize">{pet.description}</p>
            <div className="text-sm">
              <p>
                <span className="font-jua">Breed (type):</span>{" "}
                <span className="text-gray-400">{pet.breed}</span>
              </p>
              <p>
                <span className="font-jua">Health status:</span>{" "}
                <span className="text-gray-400">{pet.health_status}</span>
              </p>
            </div>
          </div>
        </div>
        {/* RIGHT */}
        <div></div>
      </div>
    </>
  );
};
