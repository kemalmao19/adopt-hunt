"use client";
import React from "react";
import { imageUrl } from "@/config/apiUrl";
import Link from "next/link";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { Search } from "lucide-react";
import { checkEnvironment } from "@/config/apiUrl";
import { useRouter } from "next/navigation";

const getUser = async (x) => {
  const res = await fetch(`${checkEnvironment()}/api/users/${x}`);
  const user = await res.json();

  return user;
};

async function getAdopter() {
  const res = await fetch(`${checkEnvironment()}/api/adopter/`, {
    cache: "no-store",
  });
  const data = await res.json();
  return data;
}

export const AllPets = async({ pets }) => {
  const router = useRouter();
  const handleSearch = (e) => {
    const domicile = e.target.domicile.value;
    const category = e.target.category.value;

    router.push(`/allpets?domicile=${domicile}&category=${category}`);
  };

  const { adopters } = await getAdopter();

  return (
    <>
      <section className="flex justify-between items-center">
        <h2 id="pets" className="my-5">
          <span className="text-ungu">All</span> Pets Here
        </h2>
        <div className="flex gap-4 items-center">
          <h2>Search</h2>
          <form
            className="flex gap-2 w-full items-center"
            onSubmit={handleSearch}
          >
            <Select name="category" label="Category">
              <SelectItem key="cat">Cat</SelectItem>
              <SelectItem key="dog">Dog</SelectItem>
            </Select>
            <Input name="domicile" type="text" placeholder="Location" />
            <Button type="submit">
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
          const petId = pet.id;

          const filterDataByPetId = (adopters) => {
            return adopters.filter((item) => item.petId === petId);
          };
          const potentialAdopter = filterDataByPetId(adopters);

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
                      Potential Adopter:{` ${potentialAdopter.length}`}
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
