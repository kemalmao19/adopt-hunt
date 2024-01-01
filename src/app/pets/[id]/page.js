import { AdoptionProcess } from "@/components/pets/components/AdoptionProcess";
import { PetAbout } from "@/components/pets/components/PetAbout";
import { PetInfo } from "@/components/pets/components/PetInfo";
import { PetOwner } from "@/components/pets/components/PetOwner";
import { checkEnvironment } from "@/config/apiUrl";

async function getPet(id) {
  const res = await fetch(`${checkEnvironment()}/api/pets/${id}`, {
    cache: "no-store",
  });
  const data = await res.json();
  return data;
}

async function getPetOwner(id) {
  const res = await fetch(`${checkEnvironment()}/api/users/${id}`, {
    cache: "no-store",
  });
  const data = await res.json();
  return data;
}

async function getAdopter() {
    const res = await fetch(`${checkEnvironment()}/api/adopter/`, {
      cache: "no-store",
    });
    const data = await res.json();
    return data;
  }

export default async function Page({ params }) {
  const { id } = params;
  const { pet } = await getPet(id);

  const userId = pet.userId;
  const { user } = await getPetOwner(userId);
  const { adopters } = await getAdopter();


  // console.log({pet})

  return (
    <>
      <PetInfo pet={pet} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* LEFT */}
        <div className="md:col-span-1 lg:col-span-2">
          <PetAbout pet={pet} />
        </div>
        {/* RIGHT */}
        <div className="space-y-6">
          <PetOwner user={user} />
          <AdoptionProcess pet={pet} user={user} adopters={adopters}/>
        </div>
      </div>
    </>
  );
}
