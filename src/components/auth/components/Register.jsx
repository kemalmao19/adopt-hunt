"use client";

import { Button, Input, Divider, Textarea } from "@nextui-org/react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const Register = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleRegister(event) {
    setLoading(true);
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const domicile = event.target.domicile.value;
    const contact = event.target.contact.value;
    const bio = event.target.bio.value;

    // console.log({ email, password, domicile, contact, bio });

    const res = await fetch("api/users/register", {
      method: "POST",
      body: JSON.stringify({
        username,
        email,
        password,
        domicile,
        contact,
        bio,
      }),
    });
    // const data = await res.json();
    const { data, message, errorMessage } = await res.json();

    if (!data) {
      setLoading(false);
      toast.error("Error registering!");
      return;
    }

    if (errorMessage) {
      setLoading(false);
      toast.error(errorMessage);
      return;
    }

    toast.success(message);
    setLoading(false);
    router.push("/login");
    console.log(data);
  }

  return (
    <>
      <h1 className="mb-3 text-center">Register</h1>
      <h3 className="text-xl font-jua text-center mb-6">
        Please create an account
      </h3>
      <form onSubmit={handleRegister} className="space-y-4">
        <Input
          name="username"
          label="Username"
          radius="full"
          variant="bordered"
        />
        <Input
          name="email"
          label="Email"
          radius="full"
          variant="bordered"
          type="email"
        />
        <Input
          name="password"
          label="Password"
          type="password"
          radius="full"
          variant="bordered"
        />
        <Divider className="my-4" />
        <p className="text-gray-400 text-sm text-center">
          Please fill in the form below to complete your data as a pet owner.
        </p>
        <Divider className="my-4" />
        <div className="grid grid-cols-2 space-x-3">
          <Input
            name="domicile"
            label="Domicile"
            radius="full"
            variant="bordered"
          />
          <Input
            name="contact"
            label="Phone number"
            radius="full"
            variant="bordered"
            type="number"
          />
        </div>
        <Textarea name="bio" label="Bio" radius="full" variant="bordered" />
        <Button
          isLoading={loading}
          isDisabled={loading}
          type="submit"
          color="danger"
          radius="full"
          size="lg"
          className="bg-black w-full"
        >
          Register
        </Button>
        <div className="flex gap-1">
          <div>Have an account ?</div>
          <Link href="/login" className="text-oren">
            Login
          </Link>
        </div>
      </form>
    </>
  );
};
