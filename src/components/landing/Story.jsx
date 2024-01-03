import React from "react";
import { checkEnvironment } from "@/config/apiUrl";

const getAdopterName = async (x) => {
  const res = await fetch(`${checkEnvironment()}/api/adopter/${x}`);
  const adopter = await res.json();

  return adopter;
};

export const Story = ({ stories }) => {
  const isSories = stories.length > 0;

  return (
    <>
      {isSories ? (
        <>
          <h2>
            <span className="text-oren">Adopter</span> Stories
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 my-20">
            {stories.map(async (story, index) => {
              const adopterName = await getAdopterName(story.adopterId);
              // console.log(adopterName);
              return (
                <div key={index}>
                  <section className="text-gray-500">{`"${story.content}"`}</section>
                  <section className="text-gray-500">{story.rating}</section>
                  <section className="text-gray-500">
                    {adopterName?.adopter.name}
                  </section>
                </div>
              );
            })}
          </div>
        </>
      ) : null}
    </>
  );
};
