import { RatingStar } from "@/components/dashboard/components/RatingStar";

export const AdopterReview = ({ review, adopter }) => {
  const adopterId = adopter[0]?.id;
  const adopterReview = review.filter((item) => item.adopterId === adopterId);
  const filledStars = Math.floor(adopterReview[0]?.rating);
  //   console.log(adopterReview[0]);

  return (
    <>
      {adopterReview.length > 0 && (
        <div className="mt-10 p-5 rounded-2xl border bg-white">
          <h3>Review from adopter</h3>
          <p className="mt-5 mb-2 text-justify text-gray-400">
            "{adopterReview[0]?.content}"
          </p>
          <div className="flex gap-[2px] mt-1 text-[12px] text-gray-400">
            <RatingStar rating={filledStars}/>
            <span>{adopterReview[0]?.rating}</span> of 5
          </div>
        </div>
      )}
    </>
  );
};
