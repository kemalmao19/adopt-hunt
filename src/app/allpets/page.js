"use server";
import React from "react";
import { AllPets } from "@/components/dashboard/components/AllPets";
import { checkEnvironment } from "@/config/apiUrl";

async function getPets() {
  const res = await fetch(
    `${checkEnvironment()}/api/pets?`,
    {
      cache: "no-cache",
    }
  );
  const { pets } = await res.json();
  return pets;
};

export default async function Page() {
  const pets = await getPets();

  return (
    <>
      <AllPets pets={pets}/>
    </>
  );
}
