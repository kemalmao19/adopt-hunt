import { Button, Input } from "@nextui-org/react";
import Link from "next/link";

export const Login = () => {
  return (
    <>
      <h1 className="mb-6 text-center">Login</h1>
      <form className="space-y-4">
        <Input
          name="email"
          label="Email"
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
