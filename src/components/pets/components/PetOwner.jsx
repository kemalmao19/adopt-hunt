"use client";
import { RatingStar } from "@/components/dashboard/components/RatingStar";
import { Card, CardHeader, Avatar, Chip } from "@nextui-org/react";
import { MapPin } from "lucide-react";
import { useState } from "react";

export const PetOwner = ({ user, review }) => {
  const userId = user.id;
  const adopterReviews = review.filter((item) => item.users.id === userId);
  const isReview = adopterReviews.length > 0;

  const calculateAverageRating = () => {
    if (adopterReviews.length === 0) {
      return 0;
    }

    const totalRating = adopterReviews.reduce(
      (sum, item) => sum + item.rating,
      0
    );
    return totalRating / adopterReviews.length;
  };

  const [averageRating, setAverageRating] = useState(calculateAverageRating);
  const filledStarsAverage = Math.round(averageRating);

  return (
    <div className="pet-owner p-5 rounded-2xl border bg-white">
      <h3>Pet Owner info</h3>
      <Card className="max-w-[340px] shadow-none">
        <CardHeader className="justify-between pl-1 pr-0 pb-0">
          <div className="flex gap-5">
            <Avatar
              isBordered
              radius="full"
              size="md"
              className="w-[40px] h-[40px] uppercase"
              name={user.username}
            />
            <div className="flex flex-col gap-1 items-start justify-center w-[calc(100%-60px)]">
              <h4 className="text-small font-semibold leading-none text-default-600 capitalize">
                {user.username}
              </h4>
              <h5 className="text-small tracking-tight text-default-400">
                <p>{user.bio}</p>

                <Chip
                  startContent={<MapPin size={18} />}
                  variant="flat"
                  color="secondary"
                  className="mt-2 capitalize"
                  size="sm"
                >
                  {user.domicile}
                </Chip>
              </h5>
              <div className="flex gap-[2px] mt-1 text-[12px] text-gray-400">
                {/* Rating average */}
                <RatingStar rating={filledStarsAverage}/>
                <span>{filledStarsAverage}</span> of 5
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {isReview && (
        <div className="border border-dashed px-2 rounded-xl mt-5">
          <h3 className="text-[18px]">Reviews:</h3>
          <div className="max-h-[200px] overflow-auto">
            {adopterReviews.map(({ id, content, rating, adopter }) => {
              const filledStars = Math.floor(rating);

              return (
                <div
                  key={id}
                  className="text-[14px] p-2 mb-2 border border-dashed rounded-md"
                >
                  <p className="text-gray-500">
                    "{content}"{" "}
                    <span className="capitalize text-black">
                      {" "}
                      - {adopter.name}
                    </span>
                  </p>
                  <div className="flex gap-[2px] mt-1">
                    <RatingStar rating={filledStars}/>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
