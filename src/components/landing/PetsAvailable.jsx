import React from "react";

export const PetsAvailable = ({ pets }) => {
  return (
    <>
      <h2 className="my-5">
        <span className="text-ungu">Pets</span> Available
      </h2>
      <div className="grid grid-cols-3 gap-8">
        {pets.map((pet) => {
          return <div key={pet.id}>{pet.name}</div>;
        })}
      </div>
    </>
  );
};
