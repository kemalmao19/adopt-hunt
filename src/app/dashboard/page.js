import { PetsAvailable } from "@/components/landing/PetsAvailable";
import React from "react";
import { checkEnvironment } from "@/config/apiUrl";

async function getPets() {
  const res = await fetch(`${checkEnvironment()}/api/pets`, {
    cache: "no-store",
  });
  const { pets } = await res.json();
  return pets;
}

async function getAdopter() {
  const res = await fetch(`${checkEnvironment()}/api/adopter/`, {
    cache: "no-store",
  });
  const data = await res.json();
  return data;
}

export default async function Page() {
  const pets = await getPets();
  const { adopters } = await getAdopter();
  return (
    <div>
      <PetsAvailable pets={pets} adopters={adopters} />
    </div>
  );
}
