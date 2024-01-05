"use client";

import {
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { UserRoundCheck } from "lucide-react";
import { useState } from "react";
import { ModalAdopter } from "./ModalAdopter";

export const PotentialAdopter = ({ potentialAdopter, pet }) => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const isPotentialAdopter = potentialAdopter.length > 0;
  const isAdopted = pet.isAdopted === true;
  const [item, setItem] = useState(null);

  const handleOpen = (item) => {
    setItem(item);
    onOpen();

    // console.log(item);
  };

  return (
    <>
      <div className="p-5 rounded-2xl border text-center bg-white">
        <h3 className="text-center mb-2">Potential Adopter</h3>
        {isPotentialAdopter ? (
          <>
            {!isAdopted ? (
              <>
                <p>Has this cat been adopted?</p>
                <p className="font-jua my-4">Select the adopter:</p>
              </>
            ) : (
              <p className="font-jua my-4">Adopter has been selected.</p>
            )}
            <div className="space-x-2 space-y-2">
              {potentialAdopter.map((item) => {
                return (
                  <Button
                    key={item.id}
                    color="warning"
                    variant="flat"
                    startContent={<UserRoundCheck size={18} />}
                    onPress={() => handleOpen(item)}
                    className={
                      item.isAdopter === true
                        ? "bg-purple-100 text-black is-adopter"
                        : null
                    }
                  >
                    {item.name}
                  </Button>
                );
              })}
            </div>
          </>
        ) : (
          <span className="text-sm text-gray-400">
            Currently no one has been interested in {pet.name} 🙁
          </span>
        )}
      </div>

      <ModalAdopter item={item} pet={pet} isOpen={isOpen} onClose={onClose} onOpenChange={onOpenChange} isAdopted={isAdopted}/>
    </>
  );
};
