"use client";

import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

// generate one fake cat data : name, category, breed, gender, age, healthStatus, description, images
const petData = {
    name: "Kittler",
    category: "Cat",
    breed: "Persian",
    gender: "Male",
    age: 1,
    healthStatus: "Vaccinated",
    description: "Descriptions",
    images: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=1443&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
}


export const UpdatePet = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleCreatePet(event) {
    setLoading(true);
    event.preventDefault();
    const formData = new FormData();

    const name = event.target.name.value;
    const category = event.target.category.value;
    const description = event.target.description.value;
    const breed = event.target.breed.value;
    const gender = event.target.gender.value;
    const age = event.target.age.value;
    const healthStatus = event.target.healthStatus.value;
    const images = event.target.images.files; // plural

    formData.append("name", name);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("breed", breed);
    formData.append("gender", gender);
    formData.append("age", age);
    formData.append("healthStatus", healthStatus);

    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }

    const res = await fetch("/api/pets", {
      method: "PUT",
      body: formData,
    });

    // TODO: VALIDASI (?)

    if (res.status === 201) {
      setLoading(false);
      toast.success("Update Pet successfully 👍");
      setTimeout(() => router.push("/dashboard/pets"), 1000); // TODO: CHANGE TO MY PETS PAGE
    }
  }

  return (
    <>
      <h2 className="mt-20 mb-10 text-center">
        Please fill this form to update pet:
      </h2>
      <form
        onSubmit={handleCreatePet}
        className="max-w-4xl mx-auto text-center"
      >
        <div className="grid grid-cols-2 gap-4">
          <Input name="name" label="Name" value={petData.name} />
          <Select name="category" label="Select a category">
            <SelectItem key="cat">Cat</SelectItem>
            <SelectItem key="dog">Dog</SelectItem>
          </Select>
          <Input name="breed" label="Breed (type)" value={petData.breed}/>
          <Input name="gender" label="Gender" value={petData.gender}/>
          <Input name="age" label="Age (in year)" type="number" value={petData.age}/>
          <Input name="healthStatus" label="Health status" value={petData.healthStatus}/>
        </div>
        <Textarea name="description" label="Description" className="my-4" value={petData.description}/>
        <Input name="images" type="file" multiple className="my-4" />
        <Button
          isLoading={loading}
          isDisabled={loading}
          type="submit"
          color="danger"
          radius="full"
          size="lg"
          className="bg-black w-full max-w-2xl"
        >
          Update Pet
        </Button>
      </form>
    </>
  );
};
