import { PetsAvailable } from "@/components/landing/PetsAvailable";
import { Story } from "@/components/landing/Story";
import { checkEnvironment } from "@/config/apiUrl";


async function getPets() {
  const res = await fetch(`${checkEnvironment()}/api/pets`, {
    cache: "no-cache",
  });
  const { pets } = await res.json();

  return pets;
}

async function getStories() {
  const res = await fetch(`${checkEnvironment()}/api/story`, {
    cache: "no-cache",
  });
  const { story } = await res.json();

  return story;
}

async function getAdopter() {
  const res = await fetch(`${checkEnvironment()}/api/adopter`, {
    cache: "no-cache",
  });
  const data = await res.json();
  return data;
}

export default async function Home() {
  
  const pets = await getPets();
  const stories = await getStories();
  const {adopters} = await getAdopter();
  

  return (
    <>
      <PetsAvailable pets={pets} adopters={adopters}/>
      <Story stories={stories}/>
    </>
  );
}
