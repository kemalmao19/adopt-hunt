import React from "react";
import { Pencil } from "lucide-react";
import { Trash2 } from "lucide-react";
import { Eye } from "lucide-react";

const fakeImage =
  "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=1443&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

export const MyPets = async () => {
  // dummy user pets data
  const pets = [
    {
      name: "Title",
      description: "Descriptions",
      potentialAdopter: 5,
      image: fakeImage,
      isAdopted: true,
    },
    {
      name: "JohnCat",
      description: "ga tau ni hewan apa",
      potentialAdopter: 3,
      image: fakeImage,
      isAdopted: false,
    },
    {
      name: "Kitty",
      description: "plis adopt this kitty",
      potentialAdopter: 1,
      image: fakeImage,
      isAdopted: true,
    },
    {
      name: "Kittler",
      description: "we bring our glory",
      potentialAdopter: 1,
      image: fakeImage,
      isAdopted: false,
    },
  ];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 my-20">
      {pets.map((pet, index) => {
        return (
          <div key={index} className="bg-white rounded-3xl border shadow-lg">
            <img
              src={pet.image}
              alt="pet"
              className="w-full h-auto rounded-t-3xl"
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
                  Potential Adopter:{" "}
                  <span className="font-bold">{pet.potentialAdopter}</span>
                </p>
              )}
            </section>
            <section className="flex justify-between items-center px-7 py-4 border-t-2 border-gray-200">
              <div className="flex space-x-4">
                <Pencil
                  strokeWidth={3}
                  className="cursor-pointer hover:scale-110"
                  color="green"
                />
                <Trash2
                  strokeWidth={3}
                  className="cursor-pointer hover:scale-110"
                  color="red"
                />
              </div>
              <Eye strokeWidth={3} className="cursor-pointer hover:scale-110" />
            </section>
          </div>
        );
      })}
    </div>
  );
};
