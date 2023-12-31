import { PetSingle } from "@/components/pets/components/PetSingle";
import { checkEnvironment } from "@/config/apiUrl";

async function getPet(id) {
    const res = await fetch(`${checkEnvironment()}/api/pets/${id}`);
    const data = await res.json();
    return data;
  }
  
  export default async function Page({ params }) {
    const { id } = params;
    const { pet } = await getPet(id);
    // console.log({pet})
  
    return (
      <PetSingle pet={pet}/>
    );
  }