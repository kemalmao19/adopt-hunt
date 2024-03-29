import { PotentialAdopter } from "@/components/dashboard/components/PotentialAdopter";
import { PetStatus } from "@/components/dashboard/components/PetStatus";
import { PetAbout } from "@/components/pets/components/PetAbout";
import { PetInfo } from "@/components/pets/components/PetInfo";
import { checkEnvironment } from "@/config/apiUrl";
import { AdopterStory } from "@/components/pets/components/AdopterStory";
import { getReviews } from "@/lib/fetchFunc";
import { AdopterReview } from "@/components/dashboard/components/AdopterReview";

async function getPet(id) {
  const res = await fetch(`${checkEnvironment()}/api/pets/${id}`, {
    cache: "no-cache",
  });
  const data = await res.json();
  return data;
}

async function getAdopter() {
  const res = await fetch(`${checkEnvironment()}/api/adopter/`, {
    cache: "no-cache",
  });
  const data = await res.json();
  return data;
}

async function getStory() {
  const res = await fetch(`${checkEnvironment()}/api/story/`, {
    cache: "no-cache",
  });
  const data = await res.json();
  return data;
}

// async function getReview(id) {
//   const res = await fetch(`${checkEnvironment()}/api/review/${id}`, {
//     cache: "no-cache",
//   });
//   const data = await res.json();
//   return data;
// }

export default async function Page({ params }) {
  const { id } = params;
  const { pet } = await getPet(id);
  const { adopters } = await getAdopter();
  const { story } = await getStory();
  const review = await getReviews();
  const petId = pet.id;

  // filter adopters by the same petId
  const filterDataByPetId = (adopters) => {
    return adopters.filter((item) => item.petId === petId);
  };

  // filter adopter
  const filterAdopter = (potentialAdopter) => {
    return potentialAdopter.filter((item) => item.isAdopter === true);
  };

  // filter story
  const filterStory = (story) => {
    return story.filter((item) => item.petId === petId)
  }

  const potentialAdopter = filterDataByPetId(adopters);
  const adopter = filterAdopter(potentialAdopter);
  const adopterName = adopter[0]?.name;
  // console.log(adopter[0].name);
  const storyAdopter = filterStory(story);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14 mt-5">
        {/* LEFT */}
        <div className="md:col-span-1 lg:col-span-2">
          <PetInfo pet={pet} />
          <PetAbout pet={pet} />
        </div>
        {/* RIGHT */}
        <div className="space-y-6 pt-10">
          <PetStatus pet={pet} adopter={adopter} />
          <AdopterReview review={review} adopter={adopter}/>
          <AdopterStory storyAdopter={storyAdopter} adopter={adopter} adopterName={adopterName}/>
          <PotentialAdopter potentialAdopter={potentialAdopter} pet={pet} />
        </div>
      </div>
    </>
  );
}
