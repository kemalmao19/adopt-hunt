"use client";

import {
  Input,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  Textarea,
} from "@nextui-org/react";
import { useState, useEffect } from "react";
import { checkEnvironment } from "@/config/apiUrl";
import toast from "react-hot-toast";
import { PetOwnerContact } from "./PetOwnerContact";
import { Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { PotentialAdopterNameOnly } from "./PotentialAdopterNameOnly";

export const AdoptionProcess = ({
  pet,
  user,
  potentialAdopter,
  adopter,
  storyAdopter,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [submitAdopter, setSubmitAdopter] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [submitStory, setSubmitStory] = useState({
    content: "",
  });
  // const [rating, setRating] = useState("");
  const [review, setReview] = useState("");

  const petId = pet.id;
  const userId = pet.userId;

  const isPotentialAdopter = potentialAdopter.length > 0;
  const isAdopted = pet.isAdopted === true;
  const isStory = storyAdopter.length > 0;

  const adopterId = adopter[0]?.id;
  const adopterName = adopter[0]?.name;
  const adopterEmail = adopter[0]?.email;

  const [submittedEmail, setSubmittedEmail] = useState("");
  const [storedEmail, setStoredEmail] = useState(adopterEmail);
  const [isEmailMatched, setIsEmailMatched] = useState(null);

  const handleEmailChange = (event) => {
    setSubmittedEmail(event.target.value);
  };

  const handleAdopterChange = (e) => {
    const { name, value } = e.target;
    setSubmitAdopter({
      ...submitAdopter,
      [name]: value,
    });
  };

  // const handleRatingChange = (event) => {
  //   const inputRating = event.target.value;
  //   // Validate if the input is a number and within the desired range
  //   if (!isNaN(inputRating) && inputRating >= 1 && inputRating <= 5) {
  //     setRating(inputRating);
  //   }
  // };

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleStoryChange = (e) => {
    const { name, value } = e.target;
    setSubmitStory({
      ...submitStory,
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

  async function handleSubmitFeedback() {
    setLoading(true);
    const { content } = submitStory;

    const res = await fetch(`${checkEnvironment()}/api/story`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content,
        adopterId: adopterId,
        petId: petId,
      }),
    });
    // const data = await res.json();
    // console.log({data})

    const resReview = await fetch(`${checkEnvironment()}/api/review`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: review,
        adopterId: adopterId,
        userId: userId,
      }),
    });
    // const dataReview = await resReview.json();
    // console.log({dataReview})

    // console.log("Review:", review);
    // console.log("Rating:", rating);

    setLoading(false);
    toast.success("Story submit successfully!");
    setTimeout(() => router.refresh(), 1000);
  }

  useEffect(() => {
    const checkEmailMatch = () => {
      // Compare the submitted email with the stored email
      const match = submittedEmail === storedEmail;
      setIsEmailMatched(match);
    };

    if (submittedEmail) {
      checkEmailMatch();
    } else {
      // Reset the state if submittedEmail is empty
      setIsEmailMatched(null);
    }
  }, [submittedEmail, storedEmail]);

  return (
    <div className="space-y-6">
      {/* PET OWNER CONTACT */}
      {isSubmit && <PetOwnerContact user={user} /> }

      {/* PET STATUS */}
      <div className="p-5 rounded-2xl border-oren border-2 text-center bg-oren-light">
        {isAdopted ? (
          <h3>
            <span className="text-red-500">Adopted</span> by{" "}
            <span className="capitalize">{adopterName}</span>
          </h3>
        ) : (
          <>
            <h3 className="text-center">
              Considering{" "}
              <span className="text-ungu capitalize">{pet.name}</span> for
              adoption?
            </h3>
            <Button
              onPress={onOpen}
              color="danger"
              radius="full"
              className="bg-black mt-4"
            >
              Yes!
            </Button>
          </>
        )}
      </div>

      {/* STORY-CHECK EMAIL, STORY FORM , REVIEW FORM*/}
      {!isStory ? (
        <>
          {" "}
          {isAdopted ? (
            <div className="p-5 rounded-2xl border bg-white mt-5">
              <h3>Are you the Adopter?</h3>
              <p className="mb-3 text-gray-500 text-sm">
                You can share your story about your new pet and give feedback to
                the Pet Owner.
              </p>
              <p className="mb-4 font-jua">First, please Type your email.</p>
              <div className="space-y-3">
                <Input
                  name="email"
                  label="Your email"
                  variant="bordered"
                  type="email"
                  value={submittedEmail}
                  onChange={handleEmailChange}
                />
                {isEmailMatched !== null && (
                  <div>
                    {isEmailMatched ? (
                      <>
                        <p className="mb-4 font-jua text-green-500">
                          Email matched!
                        </p>
                        <p className="mb-4 font-jua">
                          Then, Please submit your feedback
                        </p>
                        <form className="space-y-3">
                          <Textarea
                            name="content"
                            label="Your story about your new pet"
                            variant="bordered"
                            onChange={handleStoryChange}
                          ></Textarea>
                          <Textarea
                            name="contentReview"
                            value={review}
                            onChange={handleReviewChange}
                            label="Write your review for the Pet Owner"
                            variant="bordered"
                          ></Textarea>
                          {/* <div className="flex gap-1 pb-3">
                            <label>Rating: </label>
                            {[1, 2, 3, 4, 5].map((value) => (
                              <label key={value}>
                                <input
                                  type="radio"
                                  name="rating"
                                  value={value}
                                  checked={rating === value.toString()}
                                  onChange={handleRatingChange}
                                  className="hidden"
                                />
                                <Star
                                  color={
                                    value <= rating ? "#ffc107" : "#e4e5e9"
                                  }
                                  className="cursor-pointer"
                                />
                              </label>
                            ))}
                          </div> */}
                          <Button
                            isLoading={loading}
                            isDisabled={loading}
                            onClick={handleSubmitFeedback}
                            color="danger"
                            radius="full"
                            size="lg"
                            className="bg-black w-full disabled:cursor-not-allowed"
                          >
                            Submit
                          </Button>
                        </form>
                      </>
                    ) : (
                      <span className="text-red-500 font-jua">
                        Email does not match
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          ) : null}
        </>
      ) : null}

      {/* POTENTIAL ADOPTER */}
      <PotentialAdopterNameOnly isAdopted={isAdopted} isPotentialAdopter={isPotentialAdopter} potentialAdopter={potentialAdopter} pet={pet}/>

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
