import React from "react";
import { checkEnvironment } from "@/config/apiUrl";
import { Chip } from "@nextui-org/react";
import { UserRoundCheck, PawPrint } from "lucide-react";

const getAdopterName = async (x) => {
  const res = await fetch(`${checkEnvironment()}/api/adopter/${x}`);
  const adopter = await res.json();

  return adopter;
};

const getPetName = async (id) => {
  const res = await fetch(`${checkEnvironment()}/api/pets/${id}`);
  const pets = await res.json();

  return pets;
};

export const Story = ({ stories }) => {
  const isSories = stories.length > 0;

  return (
    <>
      {isSories ? (
        <>
          <h2>
            <span className="text-oren">Adopter</span> Stories
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {stories.map(async (story, index) => {
              const adopterName = await getAdopterName(story.adopterId);
              const petName = await getPetName(story.petId);
              // console.log(petName);
              return (
                <>
                  <div
                    key={index}
                    className="mt-10 p-5 rounded-2xl border bg-white"
                  >
                    <h3 className="capitalize"><PawPrint className="inline-block" /> {petName.pet.name}</h3>
                    <p className="my-5 block text-gray-400">
                      "{story.content}"
                    </p>
                    <Chip
                      color="warning"
                      variant="flat"
                      startContent={<UserRoundCheck size={18} />}
                      className="bg-purple-100 text-black"
                    >
                      {adopterName?.adopter.name}
                    </Chip>
                  </div>
                </>
              );
            })}
          </div>
        </>
      ) : null}
    </>
  );
};
