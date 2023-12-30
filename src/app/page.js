import { PetsAvailable } from "@/components/landing/PetsAvailable";

async function getPets() {
  const res = await fetch(`http://localhost:3000/api/pets`);
  const { pets } = await res.json();
  return pets;
}

export default async function Home() {
  const pets = await getPets();

  return <PetsAvailable pets={pets} />;
}
