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
          <p className="my-5 text-justify text-gray-400">"{storyAdopter[0]?.content}"</p>
          <Chip
            color="warning"
            variant="flat"
            startContent={<UserRoundCheck size={18} />}
            className="bg-purple-100 text-black"
          >
            {adopter}
          </Chip>
        </div>
      ) : null}
    </>
  );
};
