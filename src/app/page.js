import { PetsAvailable } from "@/components/landing/PetsAvailable";
import { Story } from "@/components/landing/Story";
import { checkEnvironment } from "@/config/apiUrl";
import prisma from "@/utils/prisma";


// async function fetchData(endpoint) {
//   const res = await fetch(`${checkEnvironment()}/api/${endpoint}`, {
//     cache: "no-cache",
//   });
//   const data = await res.json();
//   return data;
// }

// async function getPets() {
//   const { pets } = await fetchData('pets');
//   return pets;
// }

async function getPets() {
  const pets = await prisma.pet.findMany({
    include: {
      users: {
        select: {
          domicile: true,
        },
      },
      adopters: true,
    },
  });
  return pets
}


async function dapetinStory() {
  const story = await prisma.story.findMany({
    include: {
      pets: {
        select: {
          name: true,
          id: true
        }
      },
      adopter: {
        select: {
          name: true
        },
      }
    }
  });
  return story
}

export default async function Home() {
  const pets = await getPets();
  // const stories = await getStories();
  const stories = await dapetinStory();

  return (
    <>
      <PetsAvailable pets={pets}/>
      <Story stories={stories}/>
    </>
  );
}
export const dynamic = "force-dynamic"