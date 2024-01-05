import { PetsAvailable } from "@/components/landing/PetsAvailable";
import { Story } from "@/components/landing/Story";
import { checkEnvironment } from "@/config/apiUrl";


async function fetchData(endpoint) {
  const res = await fetch(`${checkEnvironment()}/api/${endpoint}`, {
    cache: "no-cache",
  });
  const data = await res.json();
  return data;
}

async function getPets() {
  const { pets } = await fetchData('pets');
  return pets;
}

async function getStories() {
  const { story } = await fetchData('story');
  return story;
}


export default async function Home() {
  const pets = await getPets();
  const stories = await getStories();

  return (
    <>
      <PetsAvailable pets={pets}/>
      <Story stories={stories}/>
    </>
  );
}
export const dynamic = "force-dynamic"