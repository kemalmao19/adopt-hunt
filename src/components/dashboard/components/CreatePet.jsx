"use client"

import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import React from "react";

export const CreatePet = () => {

  return (
    <>
      <h2 className="mt-20 mb-10 text-center">
        Please fill this form to add new pet:
      </h2>
      <form className="max-w-4xl mx-auto">
        <div className="grid grid-cols-2 gap-4">
          <Input name="name" label="Name" />
          <Select label="Select a category">
              <SelectItem value={"cat"}>Cat</SelectItem>
              <SelectItem value={"dog"}>Dog</SelectItem>
          </Select>
          <Input name="breed" label="Breed" />
          <Input name="gender" label="Gender" />
          <Input name="age" label="Age" />
          <Input name="health" label="Health status" />
        </div>
        <Textarea name="decription" label="Description" className="my-4"/>
        <Input name="images" type="file" multiple className="my-4"/>
        <Button color="danger" radius="full" size="lg" className="bg-black w-full">Create Pet</Button>
      </form>
    </>
  );
};
