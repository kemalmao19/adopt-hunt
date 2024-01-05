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

export default async function Page({searchParams}) {
  const domicile = searchParams.domicile
  const category = searchParams.category
  const pets = await getPets(domicile, category);

  return (
    <>
      <AllPets pets={pets} />
    </>
  );
}
