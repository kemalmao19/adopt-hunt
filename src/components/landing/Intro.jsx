import { Button } from "@nextui-org/react";
import Link from "next/link";

export const Intro = () => {
  return (
    <>
      <section className="relative">
        <div className="bg-oren-light absolute top-0 left-0 right-0 -z-[2] bottom-0"></div>
        <div className="bg-[url('/intro-bg.svg')] bg-contain bg-no-repeat bg-center absolute top-0 left-0 right-0 -z-[1] h-full"></div>
        <div className="mx-5 lg:mx-auto max-w-5xl py-14 lg:py-28 lg:pb-36 z-10">
          <h1 className="text-4xl md:text-6xl lg:text-[96px] leading-none text-center">
            Some <span className="text-oren">majikan</span>s looking for new{" "}
            <span className="text-ungu">babu</span>
          </h1>
          <p className="text-center text-regal-biru text-md lg:text-xl pt-5 lg:pt-8 lg:px-20">
            Start your journey towards a furry or feathered friend who will
            bring joy, companionship, and endless love into your home. -
            <span className="text-gray-400"> ChatGPT</span>
          </p>
          <div className="text-center mt-5 lg:mt-10 space-x-4 space-y-4">
            <Button href={"/dashboard"} as={Link} color="danger" className="bg-black">I'm the Pet Owner</Button>
            <Button href={"#pets"} as={Link} color="default" variant="bordered" className="border-black">Adopter looking for new pet</Button>
          </div>
        </div>
      </section>
    </>
  );
};
