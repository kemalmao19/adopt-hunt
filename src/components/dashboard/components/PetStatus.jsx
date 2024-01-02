import React from "react";

export const PetStatus = ({ pet, adopter }) => {
  const isAdopted = pet.isAdopted === true;
  const adopterName = adopter[0]?.name;

  return (
    <div className="p-5 rounded-2xl border-oren border-2 text-center bg-oren-light">
      <h3>
        {isAdopted ? (
          <>
            <span className="text-red-500">Adopted by</span>{" "}
            <span className="capitalize">{adopterName}</span>
          </>
        ) : (
          <span className="text-green-500">Still Available</span>
        )}
      </h3>
    </div>
  );
};
