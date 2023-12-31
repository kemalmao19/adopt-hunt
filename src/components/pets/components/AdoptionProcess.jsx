"use client";

import { Input, Button } from "@nextui-org/react";
import { useState } from "react";

export const AdoptionProcess = () => {
  const [loading, setLoading] = useState(false);
  return (
    <div className="space-y-6">
      {/* PET STATUS */}
      <div className="p-5 rounded-2xl border-oren border-2 text-center bg-oren-light">
        <h3 className="text-center">
          Considering <span className="text-ungu">Pet Name</span> for adoption?
        </h3>
        <Button
          color="danger"
          radius="full"
          className="bg-black mt-4"
        >
          Yes!
        </Button>
      </div>

      {/* ADOPTER FORM */}

      <div className="p-5 rounded-2xl border">
        <h3 className="text-center">Please fill this form</h3>
        <p className="text-center text-sm">
          You can get the contact number of the pet owner after submiting this
          form
        </p>
        <form className="mt-5 space-y-3">
          <Input name="name" label="Your name" variant="bordered" />
          <Input name="email" label="Email" variant="bordered" type="email" />
          <Input name="phone" label="Phone number" variant="bordered" />
          <Input name="name" label="Address" variant="bordered" />

          <Button
            isLoading={loading}
            isDisabled={loading}
            type="submit"
            color="danger"
            radius="full"
            size="lg"
            className="bg-black w-full"
          >
            Submit
          </Button>
        </form>
      </div>

      {/* PET OWNER CONTACT */}
      <div className="p-5 rounded-2xl border text-center">
        <h3 className="text-center">Here’s the contact number of the owner</h3>
        <p className="text-center text-sm">
          Contact the pet owner bla bla bla bla
        </p>
        <p className="text-2xl text-center p-2 border border-black rounded-lg inline-block mt-5">085353348534</p>
      </div>
    </div>
  );
};
