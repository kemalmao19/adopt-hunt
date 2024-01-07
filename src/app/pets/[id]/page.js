import { AdopterStory } from "@/components/pets/components/AdopterStory";
import { AdoptionProcess } from "@/components/pets/components/AdoptionProcess";
import { PetAbout } from "@/components/pets/components/PetAbout";
import { PetInfo } from "@/components/pets/components/PetInfo";
import { PetOwner } from "@/components/pets/components/PetOwner";
import { getPetDetails } from "@/lib/fetchFunc";

export default async function Page({ params }) {
  const { id } = params;
  let [petDetails] = await getPetDetails(id);

  const petInfo = {
    id: petDetails.id,
    name: petDetails.name,
    description: petDetails.description,
    breed: petDetails.breed,
    category: petDetails.category,
    gender: petDetails.gender,
    health_status: petDetails.health_status,
    age: petDetails.age,
    images: petDetails.images,
    isAdopted: petDetails.isAdopted,
  };

  const userInfo = {
    id: petDetails.users.id,
    username: petDetails.users.username,
    bio: petDetails.users.bio,
    domicile: petDetails.users.domicile,
    contact: petDetails.users.contact,
  };

  const adopterInfo = petDetails.adopters;

  const storiesInfo = petDetails.stories;

  const filterAdopter = (potentialAdopter) => {
    return potentialAdopter.filter((item) => item.isAdopter === true);
  };

  const adopterName = filterAdopter(adopterInfo)[0]?.name;
  const adopterEmail = filterAdopter(adopterInfo)[0]?.email;
  const adopterId = filterAdopter(adopterInfo)[0]?.id;

  const reviewInfo = petDetails.users.reviews;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14 mt-5">
        {/* LEFT */}
        <div className="md:col-span-1 lg:col-span-2">
          <PetInfo pet={petInfo} />
          <PetAbout pet={petInfo} />
        </div>
        {/* RIGHT */}
        <div className="space-y-6">
          <PetOwner user={userInfo} review={reviewInfo} />
          <AdoptionProcess
            pet={petInfo}
            user={userInfo}
            potentialAdopter={adopterInfo}
            adopter={adopterInfo}
            nameAdopter={adopterName}
            emailAdopter={adopterEmail}
            idAdopter={adopterId}
            storyAdopter={storiesInfo}
          />
          <AdopterStory
            storyAdopter={storiesInfo}
            adopter={adopterInfo}
            adopterName={adopterName}
          />
        </div>
      </div>
    </>
  );
}

export const dynamic = "force-dynamic";
