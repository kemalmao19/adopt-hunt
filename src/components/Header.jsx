"use client";

import { Button, Chip } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { useLogout } from "@/components/auth/hooks/useLogout";
import { useUser } from "@/components/auth/hooks/useUser";
import Cookies from "js-cookie";
import { CircleUser } from "lucide-react";
import { useState, useEffect } from "react";

export const Header = () => {
  const { user } = useUser();
  const { handleLogout } = useLogout();
  const [isClient, setIsClient] = useState(false);
  const [login, setLogin] = useState(null);

  const username = user?.username;

  // console.log(username)

  useEffect(() => {
    const isLogin = Cookies.get("isLogin");
    setLogin(isLogin);
  }, []);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <header className="sticky top-5 z-[999] mx-4 lg:mx-auto max-w-5xl shadow-sm py-3 px-6 rounded-xl bg-white/50 backdrop-blur-3xl border-[3px] border-white">
      <div className="flex justify-between items-center flex-wrap gap-5">
        <div className="flex items-center gap-5">
          <Link href={"/"}>
            <Image
              src="/logo.svg"
              alt="Adopt hunt logo"
              width={150}
              height={30}
            />
          </Link>
          {login && isClient ? (
            <Link href={"/dashboard/profile"} className="pl-4 border-l border-black">
              <Chip
                startContent={<CircleUser size={18} />}
                variant="flat"
                color="warning"
              >
                {username}
              </Chip>
            </Link>
          ) : null}
        </div>
        {login && isClient ? (
          <div className="space-x-3 ml-auto md:ml-0">
            <Link href={"/dashboard/pets"} color="foreground">
              My Pets
            </Link>
            <Button
              href={"/dashboard/pets/add"}
              as={Link}
              color="default"
              className="text-white bg-black"
            >
              Add Pet
            </Button>
            <Button onClick={handleLogout} variant="faded" color="warning">
              Log out
            </Button>
          </div>
        ) : (
          <Button
            href={"/dashboard"}
            as={Link}
            color="default"
            className="text-white bg-black "
          >
            Are you Pet Owner?
          </Button>
        )}
      </div>
    </header>
  );
};
