import React from "react";
import { MyPets } from "@/components/dashboard/components/MyPets";
import { cookies } from "next/headers";
import { checkEnvironment } from "@/config/apiUrl";

async function getPets() {
  // get userid from cookies
  const cookieStore = cookies();
  const userId = cookieStore.get("id").value;

  console.log(typeof userId);
  const res = await fetch(`${checkEnvironment()}/api/pets?userId=${userId}`, {
    cache: "no-store",
  });
  const { pets } = await res.json();
  return pets;
}

export default async function Page() {
  const pets = await getPets();

  return (
    <>
      <MyPets pets={pets}/>
    </>
  );
}
