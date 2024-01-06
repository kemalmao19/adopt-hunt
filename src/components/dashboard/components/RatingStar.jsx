import { Star } from "lucide-react";

export const RatingStar = ({rating}) => {
  return (
    <>
      {/* value rating -> dijadiin array biar bisa di map */}
      {[...Array(rating)].map((_, index) => (
        <Star key={index} size={15} color="#ffc107" />
      ))}
      {[...Array(5 - rating)].map((_, index) => (
        <Star key={`empty-${index}`} size={15} color="#e4e5e9" />
      ))}
    </>
  );
};
