import React from "react";
import {Chip} from "@nextui-org/react";

export const PetAbout = ({pet}) => {
  return (
    <div className="pt-6 border-t-2 border-oren-light">
      <h2 className="mb-2">About pet</h2>
      <div className="space-x-3 text-gray-400 font-jua">
        <Chip color="warning" variant="flat">{pet.category}</Chip>
        <Chip color="warning" variant="flat">{pet.age} y.o</Chip>
        <Chip color="warning" variant="flat">{pet.gender}</Chip>
      </div>
      <p className="mt-5 mb-10 text-gray-500">{pet.description}</p>
      <div>
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
  );
};
