import { UserProfile } from "@/components/auth/components/UserProfile";
import React from "react";

export default function Page() {
  return (
    <>
      <h1 className="mb-5">Profile</h1>
      {/* <section className="pt-20">
        <h2>Hi, username!</h2>
        <h3 className="text-xl font-jua pt-5">Welcome to your dashboard</h3>
      </section> */}
      <UserProfile />
    </>
  );
}
