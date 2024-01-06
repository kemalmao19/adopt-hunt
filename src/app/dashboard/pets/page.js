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

const filterIsDeleted = (pets) => {
  return pets.filter((pet) => !pet.isDeleted);
}

export default async function Page() {
  const data = await getPets();
  const pets = filterIsDeleted(data);

  return (
    <>
      <MyPets pets={pets}/>
    </>
  );
}
