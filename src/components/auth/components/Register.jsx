import { Button, Input, Divider, Textarea } from "@nextui-org/react";
import Link from "next/link";

export const Register = () => {
  return (
    <>
      <h1 className="mb-6 text-center">Register</h1>
      <form className="space-y-4">
        <Input name="name" label="Name" radius="full" variant="bordered" />
        <Input name="email" label="Email" radius="full" variant="bordered" type="email" />
        <Input
          name="password"
          label="Password"
          type="password"
          radius="full"
          variant="bordered"
        />
        <Divider className="my-4" />
        <p className="text-gray-400 text-sm text-center">Please fill in the form below to complete your data as a pet owner.</p>
        <Divider className="my-4" />
        <div className="grid grid-cols-2 space-x-3">
            <Input name="domicile" label="Domicile" radius="full" variant="bordered" />
            <Input name="number" label="Phone number" radius="full" variant="bordered" type="number" />
        </div>
        <Textarea
          name="bio"
          label="Bio"
          radius="full"
          variant="bordered"
        />
        <Button
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
