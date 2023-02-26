import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { SpotContext } from "contexts/SpotContext";
import { RenderImages } from "../Images/RenderImages";
import { AllReviews } from "../Reviews/AllReviews";
import { ReviewForm } from "../Reviews/ReviewForm";
import { ReactComponent as StarIcon } from "assets/star.svg";
import PlaceholderImage from "assets/placeholder.jpg";

export const Spot = () => {
  const [activeReview, setActiveReview] = useState(null);
  const { spots, currentSpot, setCurrentSpot } = useContext(SpotContext);
  const { id } = useParams();

  useEffect(() => {
    const findSpot = spots.find((spot) => spot.id.toString() === id);

    if (findSpot) {
      setCurrentSpot(findSpot);
    }
  }, [id, spots, setCurrentSpot]);

  if (!currentSpot) {
    return <h1>Oops... Spot not found.</h1>;
  }

  return (
    <div>
      <Link to='/' className="btn btn-small btn-light border my-3">
        Go back
      </Link>

      <div className="d-flex align-items-center gap-3">
        <h1>{currentSpot.title}</h1>
        <Link
          to={`/spots/edit/${id}`}
          className="btn btn-sm btn-outline-primary"
        >
          Edit
        </Link>
      </div>

      <p className="text-muted">{currentSpot.description}</p>

      <div className="d-flex align-items-center">
        <StarIcon />
        <span className="ms-2">{currentSpot.average_rating}</span>
        <p className="text-gray ms-3">{`${currentSpot.reviews.length} reviews`}</p>
      </div>

      {currentSpot.image_urls.length > 0 ? (
        <RenderImages images={currentSpot.image_urls} />
      ) : (
        <img
          src={PlaceholderImage}
          alt="No images"
          className="rounded spot-image"
        />
      )}

      <ReviewForm spotId={currentSpot.id} activeReview={activeReview} />
      <AllReviews
        reviews={currentSpot.reviews}
        setActiveReview={setActiveReview}
      />
    </div>
  );
};
