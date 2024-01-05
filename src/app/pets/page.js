import React from "react";
import { AllPets } from "@/components/pets/components/AllPets";
import { checkEnvironment } from "@/config/apiUrl";
import { getPets as getPet } from "@/lib/fetchFunc";

async function getPets(domicile, category) {
  if (!domicile && !category) {
    const pets = await getPet();
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

export const dynamic = "force-dynamic";