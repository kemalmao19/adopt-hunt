"use client";

import { Button, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation"; //+
import { useState } from "react"; //+
import toast from "react-hot-toast"; //+

export const UserProfile = ({
  id,
  username,
  email,
  contact,
  domicile,
  bio,
}) => {
  const router = useRouter(); //+
  const [loading, setLoading] = useState(false); //+

  async function updateUserData(event) {
    setLoading(true); //+
    event.preventDefault();
    const formData = new FormData(event.target);

    const email = formData.get("email");
    const contactNumber = formData.get("contactNumber");
    const domicile = formData.get("domicile");
    const bio = formData.get("bio");

    const res = await fetch(`/api/users/${id}`, {
      method: "PUT",
      body: JSON.stringify({ email, contact: contactNumber, domicile, bio }),
    });
    const data = await res.json();
    console.log(data);

    if (res.status === 200) {
      //+
      setLoading(false);
      toast.success("Edit profile successfully 👍");
      setTimeout(() => router.push("/dashboard"), 1000);
    }
  }

  return (
    <>
      <h1 className="space-y-3 pt-20">
        Hi, <span>{username}!</span>
      </h1>
      <h3 className="text-xl font-jua">Welcome to your dashboard</h3>
      <form className="space-y-4" onSubmit={updateUserData}>
        <label className="flex justify-start gap-5 items-center">
          E-mail:
          <Input
            name="email"
            type="email"
            className="w-80"
            defaultValue={email}
          />
        </label>

        <label className="flex justify-start gap-5 items-center">
          Contact number:
          <Input name="contactNumber" className="w-80" defaultValue={contact} />
        </label>

        <label className="flex justify-start gap-5 items-center">
          Domicile:
          <Input name="domicile" className="w-80" defaultValue={domicile} />
        </label>

        <label className="flex justify-start gap-5 items-center">
          Bio:
          <Input name="bio" className="w-80" defaultValue={bio} />
        </label>

        <Button
          isLoading={loading} //+
          isDisabled={loading} //+
          type="submit"
          color="danger"
          radius="full"
          size="lg"
          className="bg-black w-40"
        >
          Update
        </Button>
      </form>
    </>
  );
};
