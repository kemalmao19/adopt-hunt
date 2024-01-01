"use client";

import {
  Input,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  Chip,
} from "@nextui-org/react";
import { useState } from "react";
import { apiUrl, checkEnvironment } from "@/config/apiUrl";
import toast from "react-hot-toast";
import { PetOwnerContact } from "./PetOwnerContact";
import { UserRoundCheck } from "lucide-react";

export const AdoptionProcess = ({ pet, user, adopters }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [loading, setLoading] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [submitAdopter, setSubmitAdopter] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const petId = pet.id;
  const userId = pet.userId;

  const handleAdopterChange = (e) => {
    const { name, value } = e.target;
    setSubmitAdopter({
      ...submitAdopter,
      [name]: value,
    });
  };

  const isFormComplete = () => {
    // Check if all input values are filled
    return Object.values(submitAdopter).every((value) => value.trim() !== "");
  };

  async function handleSubmitAdopter() {
    setLoading(true);
    const { name, email, phone, address } = submitAdopter;

    const res = await fetch(`${checkEnvironment()}/api/adopter`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        address,
        userId: userId,
        petId: petId,
      }),
    });
    const data = await res.json();

    if (!data) {
      setLoading(false);
      toast.error("Error -..-");
      return;
    }

    setLoading(false);
    toast.success("Your data submit successfully!");
    setIsSubmit(true);
  }

  // filter adopters by the same petId
  const filterDataByPetId = (adopters) => {
    return adopters.filter((item) => item.petId === pet.id);
  };

  const potentialAdopter = filterDataByPetId(adopters);
  const potentialAdopterLenght = potentialAdopter.length;
  const isPotentialAdopter = potentialAdopterLenght > 0;

  // console.log(potentialAdopter)

  return (
    <div className="space-y-6">
      {/* PET OWNER CONTACT */}
      {isSubmit ? <PetOwnerContact user={user} /> : null}

      {/* PET STATUS */}
      <div className="p-5 rounded-2xl border-oren border-2 text-center bg-oren-light">
        <h3 className="text-center">
          Considering <span className="text-ungu capitalize">{pet.name}</span>{" "}
          for adoption?
        </h3>
        <Button
          onPress={onOpen}
          color="danger"
          radius="full"
          className="bg-black mt-4"
        >
          Yes!
        </Button>
      </div>

      {/* POTENTIAL ADOPTER */}
      <div className="p-5 rounded-2xl border text-center">
        <h3 className="text-center mb-2">
          Potential Adopter
        </h3>
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
          (<span className="text-sm text-gray-400">Currently no one has been interested in {pet.name} 🙁</span>)
        )}
      </div>

      {/* ADOPTER FORM */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className="p-5">
          {(onClose) => (
            <>
              {isSubmit ? (
                <PetOwnerContact user={user} /> //PROPS DRILLING TT
              ) : (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    <h3 className="text-center">Please fill this form</h3>
                    <p className="text-center text-sm">
                      You can get the{" "}
                      <span className="text-oren">contact number</span> of the
                      pet owner <span className="text-oren">after </span>
                      submiting this form.
                    </p>
                  </ModalHeader>
                  <ModalBody>
                    <form className="space-y-3">
                      <Input
                        name="name"
                        label="Your name"
                        variant="bordered"
                        onChange={handleAdopterChange}
                      />
                      <Input
                        name="email"
                        label="Email"
                        variant="bordered"
                        type="email"
                        onChange={handleAdopterChange}
                      />
                      <Input
                        name="phone"
                        label="Phone number"
                        variant="bordered"
                        onChange={handleAdopterChange}
                      />
                      <Input
                        name="address"
                        label="Address"
                        variant="bordered"
                        onChange={handleAdopterChange}
                      />
                      <Button
                        isLoading={loading}
                        isDisabled={loading}
                        onClick={handleSubmitAdopter}
                        disabled={!isFormComplete()}
                        color="danger"
                        radius="full"
                        size="lg"
                        className="bg-black w-full disabled:cursor-not-allowed"
                      >
                        Submit
                      </Button>
                    </form>
                  </ModalBody>
                </>
              )}
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};
