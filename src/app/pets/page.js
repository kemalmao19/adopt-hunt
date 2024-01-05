"use server";
import React from "react";
import { AllPets } from "@/components/pets/components/AllPets";
import { checkEnvironment } from "@/config/apiUrl";

async function getPets(domicile, category) {
  if (!domicile && !category) {
    const res = await fetch(`${checkEnvironment()}/api/pets`, {
      cache: "no-cache",
    });
    const { pets } = await res.json();
    return pets;
  } else if (domicile && !category) {
    const res = await fetch(
      `${checkEnvironment()}/api/pets?domicile=${domicile}`,
      {
        cache: "no-cache",
      }
    );
    const {pets} = await res.json();
    return pets
  }
  const res = await fetch(
    `${checkEnvironment()}/api/pets?domicile=${domicile}&category=${category}`,
    {
      cache: "no-cache",
    }
  );
  const { pets } = await res.json();
  return pets;
};

async function getAdopter() {
  const res = await fetch(`${checkEnvironment()}/api/adopter/`, {
    cache: "no-store",
  });
  const data = await res.json();
  return data;
}

export default async function Page({searchParams}) {
  const domicile = searchParams.domicile
  const category = searchParams.category
  const pets = await getPets(domicile, category);
  const { adopters } = await getAdopter();
  console.log(pets)
  console.log(searchParams)

  return (
    <>
      <AllPets pets={pets} adopters={adopters} />
    </>
  );
}
