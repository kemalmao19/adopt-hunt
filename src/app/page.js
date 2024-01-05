import { PetsAvailable } from "@/components/landing/PetsAvailable";
import { Story } from "@/components/landing/Story";
import { getPets, getStories } from "@/lib/fetchFunc";

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

export const dynamic = "force-dynamic";