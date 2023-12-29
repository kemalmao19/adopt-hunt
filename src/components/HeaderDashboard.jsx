import { Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";

export const HeaderDashboard = () => {
  return (
    <header className="sticky top-5 z-10 mx-4 lg:mx-auto max-w-5xl shadow-sm py-3 px-6 rounded-xl bg-white/50 backdrop-blur-3xl border-[3px] border-white">
      <nav className="flex justify-between items-center">
        <div className="flex items-center gap-5">
          <Link href={"/"}>
            <Image
              src="/logo.svg"
              alt="Adopt hunt logo"
              width={150}
              height={30}
            />
          </Link>
          <Link
            href={"/dashboard"}
            className="font-semibold border-l-2 border-black pl-4"
          >
            Dashboard
          </Link>
        </div>
        <div className="space-x-5">
          <Link href={"/"} color="foreground">
            My Pets
          </Link>
          <Button
            href={"/dashboard/pets/add"}
            color="default"
            as={Link}
            className="text-white bg-black"
          >
            Add Pet
          </Button>
        </div>
      </nav>
    </header>
  );
};
