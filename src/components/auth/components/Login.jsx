"use client";

import { Button, Input } from "@nextui-org/react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const Login = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin(event) {
    setLoading(true);
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    // console.log({ email, password });

    const res = await fetch("api/users/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });
    const { message, errorMessage } = await res.json();

    if (errorMessage) {
      toast.error(errorMessage);
      setLoading(false);
      return;
    }

    toast.success(message);
    setLoading(false);
    setTimeout(() => router.push("/dashboard"), 1000);
  }

  return (
    <>
      <h1 className="mb-3 text-center">Login</h1>
      <h3 className="text-xl font-jua text-center mb-6">Welcome back!</h3>
      <form onSubmit={handleLogin} className="space-y-4">
        <Input
          name="username"
          label="Username"
          radius="full"
          variant="bordered"
        />
        <Input
          name="password"
          label="Password"
          type="password"
          radius="full"
          variant="bordered"
        />
        <Button
          isLoading={loading}
          isDisabled={loading}
          type="submit"
          color="danger"
          radius="full"
          size="lg"
          className="bg-black w-full"
        >
          Login
        </Button>
        <div className="flex gap-1">
          <div>Don't have an account ?</div>
          <Link href="/register" className="text-oren">
            Register
          </Link>
        </div>
      </form>
    </>
  );
};
