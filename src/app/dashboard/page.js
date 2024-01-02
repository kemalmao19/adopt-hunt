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

export default async function Page() {
  const pets = await getPets();
  return (
    <div>
      <PetsAvailable pets={pets} />
    </div>
  );
}
