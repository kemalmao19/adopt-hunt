import { Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="sticky top-5 z-10 mx-4 lg:mx-auto max-w-5xl shadow-sm py-3 px-6 rounded-xl bg-white/50 backdrop-blur-3xl border-[3px] border-white">
      <nav className="flex justify-between items-center">
        <Link href={"/"}>
          <Image
            src="/logo.svg"
            alt="Adopt hunt logo"
            width={150}
            height={30}
          />
        </Link>
        <Button
          href={"/dashboard"}
          as={Link}
          color="default"
          className="text-white bg-black "
        >
          Pet Owner
        </Button>
      </nav>
    </header>
  );
};
