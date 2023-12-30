import React from "react";
import { cookies } from "next/headers";

async function getPets() {
  const userId = cookies().get("id").value;
  const res = await fetch(`http://localhost:3000/api/pets?userId=${userId}`);
  const { pets } = await res.json();
  return pets;
}

export default async function Page() {
  const pets = await getPets();
  console.log(pets);

  return (
    <div>
      <h1>My Pet</h1>
      <div>
        {pets.map((pet) => {
          return <div key={pet.id}>{pet.name}</div>;
        })}
      </div>
    </div>
  );
}
