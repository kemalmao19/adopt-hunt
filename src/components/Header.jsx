"use client";

import { Button, Chip, Tooltip } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { useLogout } from "@/components/auth/hooks/useLogout";
import Cookies from "js-cookie";
import { CircleUser } from "lucide-react";
import { useState, useEffect } from 'react'

export const Header = () => {
  const { handleLogout } = useLogout();
  const [isClient, setIsClient] = useState(false);
  const login = Cookies.get("isLogin");
  const username = Cookies.get("username");

  console.log(username)

  const isLogin = login === "true";

    useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <header className="sticky top-5 z-10 mx-4 lg:mx-auto max-w-5xl shadow-sm py-3 px-6 rounded-xl bg-white/50 backdrop-blur-3xl border-[3px] border-white">
      <div className="flex justify-center md:justify-between items-center flex-wrap gap-5">
        <div className="flex items-center gap-5">
          <Link href={"/"}>
            <Image
              src="/logo.svg"
              alt="Adopt hunt logo"
              width={150}
              height={30}
            />
          </Link>
          {isLogin && isClient ? (
            <Link href={"/dashboard"} className="pl-4 border-l border-black">
              <Tooltip content="Pet owner profile">
                <Chip
                  startContent={<CircleUser size={18} />}
                  variant="flat"
                  color="warning"
                >
                  {username}
                </Chip>
              </Tooltip>
            </Link>
          ) : null}
        </div>
        {isLogin && isClient ? (
          <div className="space-x-3">
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
            Pet Owner
          </Button>
        )}
      </div>
    </header>
  );
};
