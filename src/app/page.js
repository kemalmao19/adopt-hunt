import { PetsAvailable } from "@/components/landing/PetsAvailable";
import { Story } from "@/components/landing/Story";
import { apiUrl, checkEnvironment } from "@/config/apiUrl";

async function getPets() {
  const res = await fetch(`${checkEnvironment()}/api/pets`);
  const { pets } = await res.json();
  // console.log(pets);
  return pets;
}

async function getStories() {
  const res = await fetch(`${checkEnvironment()}/api/story`);
  const { stories } = await res.json();
  // console.log(stories);
  return stories;
}

export default async function Home() {
  const pets = await getPets();
  const stories = await getStories();

  return (
  <> 
  <PetsAvailable pets={pets} />
  <Story stories={stories}/>
  </>
  )
}
