import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Input,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { checkEnvironment } from "@/config/apiUrl";
import toast from "react-hot-toast";

export const ModalAdopter = ({item, pet, isOpen, onClose, onOpenChange, isAdopted}) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleTheAdopter(event) {
    setLoading(true);
    event.preventDefault();

    const id = event.target.id.value;

    const data = {
      isAdopter: true,
    };

    const formData = new FormData();
    formData.append("isAdopted", true);

    const res = await fetch(`${checkEnvironment()}/api/adopter/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const resPet = await fetch(`/api/pets/${pet.id}`, {
      method: "PUT",
      body: formData,
    });

    // console.log(data);
    if (res.status === 200 && resPet.status === 200) {
      setLoading(false);
      toast.success("Success! 👍");
      setTimeout(() => router.refresh(), 1000);
      onClose();
    }
  }
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent className="p-5">
        {() => (
          <>
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h3 className="text-center">Details info:</h3>
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
                {!isAdopted ? (
                  <form onSubmit={handleTheAdopter}>
                    <Input
                      name="id"
                      defaultValue={item.id}
                      className="hidden"
                    />
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
                ) : null}
              </ModalBody>
            </>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
