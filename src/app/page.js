import { PetsAvailable } from "@/components/landing/PetsAvailable";
import { Story } from "@/components/landing/Story";
import prisma from "@/utils/prisma";

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


async function getStories() {
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
  const stories = await getStories();

  return (
    <>
      <PetsAvailable pets={pets}/>
      <Story stories={stories}/>
    </>
  );
}