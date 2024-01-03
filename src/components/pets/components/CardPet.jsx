import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Image,
  Chip,
} from "@nextui-org/react";
import { MapPin } from "lucide-react";
import Link from "next/link";

export const CardPet = ({
  index,
  pet,
  image,
  userLocation,
  potentialAdopter,
}) => {
  return (
    <Card className="card-pet h-full" key={index}>
      <CardHeader className="p-0">
        <Link href={`/pets/${pet.id}`}>
          <Image
            alt="Card background"
            className="object-cover"
            src={image}
            width={700}
            height={100}
          />
        </Link>
      </CardHeader>
      <CardBody className="flex flex-col h-full justify-between p-5">
        <h2 className="text-2xl leading-[1.2] capitalize">
          <Link href={`/pets/${pet.id}`}>{pet.name}</Link>
        </h2>
        <div>
          <p className="text-gray-400 thin-text text-sm mb-3">
            {pet.description}
          </p>
          <Chip
            startContent={<MapPin size={14} />}
            variant="flat"
            color="secondary"
            className="mt-2 capitalize text-xs"
            size="sm"
          >
            {userLocation.user["domicile"]}
          </Chip>
        </div>
      </CardBody>
      <Divider />
      <CardFooter className="p-5">
        {pet.isAdopted ? (
          <div className="thin-text text-orange-500">Adopted</div>
        ) : (
          <p className="text-gray-500 thin-text">
            Potential Adopter:{` ${potentialAdopter.length}`}
            <span className="font-bold">{pet.potentialAdopter}</span>
          </p>
        )}
      </CardFooter>
    </Card>
  );
};
