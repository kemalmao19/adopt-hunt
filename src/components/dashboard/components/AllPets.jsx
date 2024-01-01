"use client";
import React from "react";
import { imageUrl } from "@/config/apiUrl";
import Link from "next/link";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { Search } from "lucide-react";
import { checkEnvironment } from "@/config/apiUrl";
import { useState } from "react";

const getUser = async (x) => {
  const res = await fetch(`${checkEnvironment()}/api/users/${x}`);
  const adopter = await res.json();

  return adopter;
};

export const AllPets = ({ pets }) => {

  return (
    <>
      <section className="flex justify-between items-center">
        <h2 id="pets" className="my-5">
          <span className="text-ungu">All</span> Pets Here
        </h2>
        <div className="flex gap-4 items-center">
          <h2>Search</h2>
          <form className="flex gap-2 w-full items-center">
            <Select name="category" label="Cat">
              <SelectItem key="cat">Cat</SelectItem>
              <SelectItem key="dog">Dog</SelectItem>
            </Select>
            <Input name="domicile" type="text" placeholder="Jakarta"/>
            <Button type="submit" auto>
              <Search />
            </Button>
          </form>
        </div>
      </section>
      <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 my-20">
        {pets.map(async (pet, index) => {
          let imageSize = "tr:w-300,h-200";
          let image = `${imageUrl}/${imageSize}/pets/${pet.id}/${pet.images[0]}`;
          const userLocation = await getUser(pet.userId);

          return (
            <Link key={index} href={`/pets/${pet.id}`}>
              <div className="bg-white rounded-3xl border shadow-lg hover:scale-105 transition-all ease-in duration-100 cursor-pointer">
                <img
                  src={image}
                  alt="pet"
                  className="w-full h-auto rounded-t-3xl"
                  width={300}
                  height={200}
                />
                <section className="p-7 flex flex-col gap-8">
                  <div className="space-y-1">
                    <h2 className="text-3xl">{pet.name}</h2>
                    <p className="text-gray-500 thin-text">{pet.description}</p>
                    <p>{userLocation.user["domicile"]}</p>
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
              </div>
            </Link>
          );
        })}
      </section>
    </>
  );
};
