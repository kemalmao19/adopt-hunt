import React from "react";

export const PetOwner = ({ user }) => {
  return (
    <div className="pet-owner p-5 rounded-2xl border">
      <h3 className="text-center">Pet Owner</h3>
      <p>{user.username}</p>
      <p>{user.domicile}</p>
      <p>{user.bio}</p>
    </div>
  );
};
