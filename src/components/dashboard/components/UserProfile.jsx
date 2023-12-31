"use client";

import { Button, Input, Divider, Textarea } from "@nextui-org/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { apiUrl } from "@/config/apiUrl";

async function getData() {
  const res = await fetch(`${apiUrl}/users`);
  const users = await res.json();
  return users;
}

export default async function Profile() {
  const { users } = await getData();

  console.log(users);
}

export const UserProfile = () => {
  return (
    <>
      <h1 className="space-y-3 pt-20">
        Hi, <span>username!</span>
      </h1>
      <h3 className="text-xl font-jua mb-6">Welcome to your dashboard</h3>
      <form className="space-y-4">
        <label className="flex justify-start gap-5 items-center">
          E-mail:
          <Input name="email" type="email" className="w-80 " />
        </label>

        <label className="flex justify-start gap-5 items-center">
          Contact number:
          <Input name="contactNumber" className="w-80 " />
        </label>
        <label className="flex justify-start gap-5 items-center">
          Domicile:
          <Input name="domicile" className="w-80 " />
        </label>
        <label className="flex justify-start gap-5 items-center">
          Bio:
          <Input name="bio" className="w-80 " />
        </label>
        <Button
          type="submit"
          color="danger"
          radius="full"
          size="lg"
          className="bg-black w-40"
        >
          Edit
        </Button>
      </form>
    </>
  );
};
