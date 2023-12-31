import { PetsAvailable } from "@/components/landing/PetsAvailable";
import { Story } from "@/components/landing/Story";
import { checkEnvironment } from "@/config/apiUrl";

async function getPets() {
  const res = await fetch(`${checkEnvironment()}/api/pets`, {
    cache: 'no-store',
  });
  const { pets } = await res.json();
  // console.log(pets);
  return pets;
}

async function getStories() {
  const res = await fetch(`${checkEnvironment()}/api/story`, {
    cache: 'no-store',
  });
  const {story} = await res.json();
  // console.log(story);
  return story;
}

export default async function Home() {
  const pets = await getPets();
  const stories = await getStories();

  return (
  <> 
  <PetsAvailable pets={pets} />
  {/* <Story stories={stories}/> */}
  </>
  )
}
