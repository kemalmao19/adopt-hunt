import React from "react";

export const PetAbout = ({pet}) => {
  return (
    <div className="p-5 rounded-2xl shadow-md">
      <h2 className="mb-2">About pet</h2>
      <div className="space-x-5 text-gray-400 text-sm font-jua">
        <span>{pet.category}</span>
        <span>{pet.age} y.o.</span>
        <span>{pet.gender}</span>
      </div>
      <p className="mt-5 mb-10 text-gray-500">{pet.description}</p>
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
  );
};
