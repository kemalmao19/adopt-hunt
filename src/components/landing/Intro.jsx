import React from "react";

export const Intro = () => {
  return (
    <>
    {/* h-[300px] md:h-[400px] lg:h-[620px] */}
      <section className="relative lg:pb-[3rem]">
        <div className="bg-oren-light absolute top-0 left-[-1000%] right-[-1000%] -z-[2] bottom-0"></div>
        <div className="bg-[url('/intro-bg.svg')] bg-contain bg-no-repeat bg-center absolute -top-16 left-0 right-0 -z-[1] h-full"></div>
        <div className="mx-auto max-w-5xl py-8 pb-12 lg:py-20 lg:pb-24 z-10">
          <h1 className="text-4xl md:text-6xl lg:text-[96px] leading-none text-center">
            Some <span className="text-oren">majikan</span>s looking for new{" "}
            <span className="text-ungu">babu</span>
          </h1>
          <p className="text-center text-regal-biru text-md lg:text-xl pt-8 lg:px-20">
            Start your journey towards a furry or feathered friend who will
            bring joy, companionship, and endless love into your home. -
            <span className="text-gray-400"> ChatGPT</span>
          </p>
        </div>
      </section>
    </>
  );
};
