"use client";
import React from "react";
import { imageUrl } from "@/config/apiUrl";
import Link from "next/link";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { CardPet } from "@/components/pets/components/CardPet";

export const AllPets = async ({ pets }) => {
  const router = useRouter();
  const handleSearch = (e) => {
    const domicile = e.target.domicile.value;
    const category = e.target.category.value;

    router.push(`/pets?domicile=${domicile}&category=${category}`);
  };

  const isPets = pets.length > 0;

  return (
    <>
      <section className="flex justify-between items-center">
        <h2 id="pets" className="my-5">
          <span className="text-ungu">All</span> Pets Here
        </h2>
      </section>

      <div className="flex gap-4 items-center mt-10 max-w-3xl mx-auto">
        <h2>Search</h2>
        <form
          className="flex gap-2 w-full items-center"
          onSubmit={handleSearch}
        >
          <Select name="category" label="Category" size="sm">
            <SelectItem key="cat">Cat</SelectItem>
            <SelectItem key="dog">Dog</SelectItem>
          </Select>
          <Input name="domicile" type="text" placeholder="Location" size="sm" />
          <Button
            isIconOnly
            color="secondary"
            type="submit"
            className="bg-ungu"
          >
            <Search />
          </Button>
        </form>
      </div>
      {!isPets ? (
        <p className="font-jua text-2xl text-center mt-10">
          uh no result, sorry..
        </p>
      ) : null}
      <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 my-16">
        {pets.map((pet, index) => {
          let imageSize = "tr:w-300,h-200";
          let image = `${imageUrl}/${imageSize}/pets/${pet.id}/${pet.images[0]}`;
          const userLoc = pet.users.domicile

          return (
            <div key={index}>
              <CardPet
                index={index}
                pet={pet}
                image={image}
                userLocation={userLoc}
                potentialAdopter={pet.adopters}
              />
            </div>
          );
        })}
      </section>
    </>
  );
};
