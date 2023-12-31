import { UserProfile } from "@/components/dashboard/components/UserProfile";
import React from "react";

export default function Page() {
  return (
    <>
      <h2 className="mb-5">User Profile</h2>
      <section className="mt-10">
        <UserProfile />
      </section>
    </>
  );
}
