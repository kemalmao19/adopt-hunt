import { PetsAvailable } from '@/components/landing/PetsAvailable'
import React from 'react'

async function getPets() {
  const res = await fetch(`http://localhost:3000/api/pets`);
  const { pets } = await res.json();
  return pets;
}



export default async function Page() {
  const pets = await getPets();
  return (
    <div>
      <PetsAvailable pets={pets}/>
    </div>
  )
}