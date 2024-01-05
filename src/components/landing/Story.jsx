import React from "react";
import { Chip } from "@nextui-org/react";
import { UserRoundCheck, PawPrint } from "lucide-react";
import Link from "next/link";

export const Story = ({ stories, adopter, pet }) => {
  const isSories = stories.length > 0;

  return (
    <>
      {isSories ? (
        <>
          <h2>
            <span className="text-oren">Adopter</span> Stories
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 my-10">
            {stories.map((story, index) => {
              const adopterName = story.adopter.name;
              const petName = story.pets.name
              const petId = story.pets.id

              return (
                <div key={index}>
                  <div
                    className="p-5 rounded-2xl border bg-white"
                  >
                    <Link href={`/pets/${petId}`}>
                      <h3 className="capitalize">
                        <PawPrint className="inline-block mr-2" />
                        {petName}
                      </h3>
                      <p className="my-5 text-justify text-gray-400">
                        "{story.content}"
                      </p>
                      <Chip
                        color="warning"
                        variant="flat"
                        startContent={<UserRoundCheck size={18} />}
                        className="bg-purple-100 text-black"
                      >
                        {adopterName?adopterName: ""}
                      </Chip>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : null}
    </>
  );
};
