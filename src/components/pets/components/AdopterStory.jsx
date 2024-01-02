import { Chip } from "@nextui-org/react";
import { UserRoundCheck } from "lucide-react";
import React from "react";

export const AdopterStory = ({ storyAdopter, adopter }) => {
  const isStory = storyAdopter.length > 0;

  return (
    <>
      {isStory ? (
        <div className="mt-10 p-5 rounded-2xl border bg-white">
          <h3>Adopter story</h3>
          <quote className="my-5 block text-gray-400">"{storyAdopter[0]?.content}"</quote>
          <Chip
            color="warning"
            variant="flat"
            startContent={<UserRoundCheck size={18} />}
          >
            {adopter[0]?.name}
          </Chip>
        </div>
      ) : null}
    </>
  );
};
