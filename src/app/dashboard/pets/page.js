import React from "react";
import { MyPets } from "@/components/dashboard/components/MyPets";
import { cookies } from "next/headers";
import { checkEnvironment } from "@/config/apiUrl";

async function getPets() {
  // get userid from cookies
  const cookieStore = cookies();
  const userId = cookieStore.get("id").value;

  const res = await fetch(`${checkEnvironment()}/api/pets?userId=${userId}`, {
    cache: "no-cache",
  });
  const { pets } = await res.json();
  return pets;
}

async function getAdopter() {
  const res = await fetch(`${checkEnvironment()}/api/adopter/`, {
    cache: "no-cache",
  });
  const data = await res.json();
  return data;
}

export default async function Page() {
  const pets = await getPets();
  const { adopters } = await getAdopter();

  return (
    <>
      <MyPets pets={pets} adopters={adopters}/>
    </>
  );
}
