import React from "react";
import className from "classname";
import Image from "next/image";

export const FileSelector = (props) => {
  return (
    <input
      {...props}
      type="file"
      multiple
      className={className({
        "file:bg-violet-50 file:text-violet-500 hover:file:bg-violet-100": true,
        "file:rounded-lg file:rounded-tr-none file:rounded-br-none": true,
        "file:px-4 file:py-2 file:mr-4 file:border-none": true,
        // overall input styling
        "mb-4 hover:cursor-pointer border rounded-lg text-gray-400": true,
      })}
    />
  );
};

export const ImagePreview = ({images}) => {
  return (
    <>
      <div className="grid grid-cols-12 gap-2 my-2">
        {images.map((image) => {
          const src = URL.createObjectURL(image);
          return (
            <div className="mb-4 relative aspect-video col-span-4" key={image.name}>
              <Image src={src} alt={image.name} className="object-cover rounded-xl" fill />
            </div>
          );
        })}
      </div>
    </>
  );
}