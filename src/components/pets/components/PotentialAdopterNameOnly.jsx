import { Chip } from "@nextui-org/react";
import { UserRoundCheck } from "lucide-react";
import React from "react";

export const PotentialAdopterNameOnly = ({isAdopted, isPotentialAdopter, potentialAdopter, pet}) => {
  return (
    <>
      {!isAdopted && (
        <div className="p-5 rounded-2xl border text-center bg-white">
          <h3 className="text-center mb-2">Potential Adopter</h3>
          {isPotentialAdopter ? (
            <div className="space-x-2 space-y-2">
              {potentialAdopter.map(({ id, name }) => {
                return (
                  <Chip
                    key={id}
                    color="warning"
                    variant="flat"
                    startContent={<UserRoundCheck size={18} />}
                  >
                    {name}
                  </Chip>
                );
              })}
            </div>
          ) : (
            <span className="text-sm text-gray-400">
              Currently no one has been interested in {pet.name} 🙁
            </span>
          )}
        </div>
      )}
    </>
  );
};
