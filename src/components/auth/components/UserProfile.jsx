"use client";

import { Button, Input, Divider, Textarea } from "@nextui-org/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const UserProfile = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleUserProfile(event) {
    setLoading(true);
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const contact = event.target.contact.value;
    const domicile = event.target.domicile.value;
    const bio = event.target.bio.value;

    // console.log({ email, password, domicile, contact, bio });

    const res = await fetch("api/users/register", {
      method: "GET",
      body: JSON.stringify({
        username,
        email,
        contact,
        domicile,
        bio,
      }),
    });
    // const data = await res.json();
    const { data, message, errorMessage } = await res.json();

    if (!data) {
      setLoading(false);
      toast.error("Error Updating!");
      return;
    }

    if (errorMessage) {
      setLoading(false);
      toast.error(errorMessage);
      return;
    }

    toast.success(message);
    setLoading(false);
    router.push("/dashboard");
    console.log(data);
  }

  return (
    <>
      <h1 className="mb-3 pt-20">Hi, username!</h1>
      <h3 className="text-xl font-jua mb-6">Welcome to your dashboard</h3>
      <form onSubmit={handleUserProfile} className="space-y-4">
        <Input name="email" label="E-mail" type="email" className="w-80 " />
        <Input name="contactNumber" label="Contact Number" className="w-80 " />
        <Input name="domicile" label="Domicile" className="w-80 " />
        <Input name="bio" label="Bio:" className="w-80 " />
        <Button
          isLoading={loading}
          isDisabled={loading}
          type="submit"
          color="danger"
          radius="full"
          size="lg"
          className="bg-black w-40 "
        >
          Edit
        </Button>
      </form>
    </>
  );
};
