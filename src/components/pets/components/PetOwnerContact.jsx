import React from "react";

export const PetOwnerContact = ({user}) => {
  return (
    <div className="p-5 rounded-2xl border text-center">
      <h3 className="text-center">Here’s the contact number of the owner</h3>
      <p className="text-center text-sm">
        Contact the pet owner bla bla bla bla 
      </p>
      <p className="text-2xl text-center p-2 border border-black rounded-lg inline-block mt-5">
        {user.contact}
      </p>
    </div>
  );
};
