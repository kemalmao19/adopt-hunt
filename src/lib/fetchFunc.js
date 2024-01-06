import prisma from "@/utils/prisma";
export async function getPets() {
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
  return pets;
}

export async function getStories() {
  const story = await prisma.story.findMany({
    include: {
      pets: {
        select: {
          name: true,
          id: true,
        },
      },
      adopter: {
        select: {
          name: true,
        },
      },
    },
  });
  return story;
}

export async function getReviews() {
  const review = await prisma.review.findMany({
    include: {
      adopter: {
        select: {
          name: true
        },
      },
      users: {
        select: {
          id: true,
          username: true
        },
      }
    }
  });
  return review;
}