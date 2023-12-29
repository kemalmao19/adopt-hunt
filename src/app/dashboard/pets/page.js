import React from "react";
import {MyPets} from "@/components/dashboard/components/MyPets";

export default function page() {
  return (
    <>
      <h2 className="mb-5">My Pets</h2>
      <section className="mt-10">
        <MyPets />
      </section>
    </>
  );
}
