import { UserProfile } from "@/components/dashboard/components/UserProfile";
import { cookies } from "next/headers";
import { verify } from "jsonwebtoken";
import { checkEnvironment } from "@/config/apiUrl";
import React from "react";

async function getUserData() {
  const token = cookies().get("token").value;
  const { id } = verify(token, process.env.JWT_SECRET);
  const res = await fetch(`${checkEnvironment()}/api/users/${id}`, {
    cache: "no-cache",
  });
  const data = await res.json();
  return data;
}

export default async function Page() {
  const { user } = await getUserData();

  return (
    <>
      <h2 className="mt-5 mb-10">User Profile</h2>
      <section>
        <UserProfile
          id={user.id}
          username={user.username}
          email={user.email}
          contact={user.contact}
          domicile={user.domicile}
          bio={user.bio}
        />
      </section>
    </>
  );
}
