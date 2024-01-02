import React from "react";

export const AdopterStory = ({ storyAdopter }) => {
  const isStory = storyAdopter.length > 0;
  
  return (
    <>
      {isStory ? (
        <div className="mt-10 p-5 border border-oren">
          {storyAdopter[0]?.content}
        </div>
      ) : (
        "tidak ada"
      )}
    </>
  );
};
