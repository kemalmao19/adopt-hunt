"use client";

import {
  Chip,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { UserRoundCheck } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { checkEnvironment } from "@/config/apiUrl";
import toast from "react-hot-toast";

export const PotentialAdopter = ({ potentialAdopter, pet }) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const router = useRouter();
  const isPotentialAdopter = potentialAdopter.length > 0;
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleOpen = (item) => {
    setItem(item);
    onOpen();
  };

  async function handleTheAdopter(event) {
    setLoading(true);
    event.preventDefault();

    const id = event.target.id.value;

    const data = {
      isAdopter: true,
    }

    const dataPet = {
      isAdopted: true,
    }

    const res = await fetch(`${checkEnvironment()}/api/adopter/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const resPet = await fetch(`${checkEnvironment()}/api/pets/${pet.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataPet),
    });

    // console.log(data);
    if (res.status === 200 && resPet.status === 201) {
      setLoading(false);
      toast.success("Success! 👍");
      setTimeout(() => router.refresh(), 1000);
      onClose();
    }
  }

  return (
    <>
      <div className="p-5 rounded-2xl border text-center bg-white">
        {isPotentialAdopter ? (
          <>
            <h3 className="text-center mb-2">Potential Adopter</h3>
            <p>Has this cat been adopted?</p>
            <p className="font-jua my-4">Select the adopter:</p>
            <div className="space-x-2 space-y-2">
              {potentialAdopter.map((item) => {
                return (
                  <Button
                    key={item.id}
                    color="warning"
                    variant="flat"
                    startContent={<UserRoundCheck size={18} />}
                    onPress={() => handleOpen(item)}
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

      <Modal item={item} isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className="p-5">
          {() => (
            <>
              <>
                <ModalHeader className="flex flex-col gap-1">
                  <h3 className="text-center">Potential Adopter info:</h3>
                </ModalHeader>
                <ModalBody>
                  <p>
                    <span className="font-jua">Name:</span> {item.name}
                  </p>
                  <p>
                    <span className="font-jua">Email:</span> {item.email}
                  </p>
                  <p>
                    <span className="font-jua">Phone number:</span> {item.phone}
                  </p>
                  <p>
                    <span className="font-jua">Address:</span> {item.address}
                  </p>
                  <form onSubmit={handleTheAdopter}>
                    <Input name="id" defaultValue={item.id} className="hidden"/>
                    <Button
                      isLoading={loading}
                      isDisabled={loading}
                      color="danger"
                      radius="full"
                      size="lg"
                      className="bg-oren w-full mt-5"
                      type="submit"
                    >
                      This is the adopter
                    </Button>
                  </form>
                </ModalBody>
              </>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
