import React from "react";
import { Image } from "@nextui-org/react";
import { imageUrl } from "@/config/apiUrl";

export const PetInfo = ({ pet }) => {
  const petImages = pet.images;
  //   console.log(petImages);

  return (
    <>
      <h1 className="mb-10 capitalize">{pet.name}</h1>
      <div className="pet-images grid grid-cols-3 gap-5 mb-10">
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
    </>
  );
};
