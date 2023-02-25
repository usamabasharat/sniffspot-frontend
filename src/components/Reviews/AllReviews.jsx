import React from "react";
import { ReactComponent as StarIcon } from "assets/star.svg";

export const AllReviews = ({ reviews, setActiveReview }) => {
  const getFormattedDate = (date) => {
    const options = {
      month: "short",
      day: "numeric",
      year: "numeric",
    };

    return new Date(date).toLocaleDateString("en-US", options);
  };

  return (
    <div className="mt-3">
      <h1>All Reviews:</h1>
      {reviews.map((review) => (
        <div key={review.id} className="row align-items-center mb-3">
          <div className="col-7">
            <p className="text-muted">{getFormattedDate(review.created_at)}</p>
            {[...Array(review.rating)].map((rating) => (
              <React.Fragment key={rating}>
                <StarIcon />
              </React.Fragment>
            ))}
            <p>{review.comment}</p>
          </div>

          <div className="col-2">
            <button
              onClick={() => setActiveReview(review)}
              className="btn btn-sm btn-outline-dark"
            >
              Edit review
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
