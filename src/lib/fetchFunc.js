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

export async function getPetDetails(id) {
  const pet = await prisma.pet.findMany({
    where: {
      id,
    },
    include: {
      users: {
        select: {
          id: true,
          username: true,
          bio: true,
          domicile: true,
          contact: true,
          reviews: {
            select: {
              id: true,
              content: true,
              rating: true,
              adopter: {
                select: {
                  name: true
                },
              },
            },
          }
        },
      },
      adopters: {
        select: {
          name: true,
          isAdopter: true,
        },
      },
      stories: {
        select: {
          content: true,
          adopter: {
            select: {
              name: true,
              petId: true
            },
          }
        },
      }
    },
  });
  return pet;
}