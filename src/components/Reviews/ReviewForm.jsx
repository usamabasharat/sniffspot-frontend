import { useContext, useEffect, useState } from "react";
import { createReview, updateReview } from "api/review";
import { SpotContext } from "contexts/SpotContext";
import { fetchSpots } from "api/spots";

export const ReviewForm = ({ spotId, activeReview }) => {
  const { setSpots } = useContext(SpotContext);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      comment: review,
      rating,
    };

    if (activeReview) {
      await updateReview(activeReview.id, payload);
    } else {
      await createReview(spotId, payload);
    }

    const updatedSpots = await fetchSpots();
    setSpots(updatedSpots);
    resetForm();
  };

  const resetForm = () => {
    setReview("");
    setRating("");
  };

  useEffect(() => {
    setReview(activeReview ? activeReview.comment : "");
    setRating(activeReview ? activeReview.rating : "");
  }, [activeReview]);

  return (
    <div className="mt-3">
      <h2>Leave a review:</h2>

      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-3">
          <input
            type="text"
            placeholder="Write a review..."
            className="form-control"
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
        </div>

        <div className="col-3">
          <input
            type="number"
            className="form-control"
            placeholder="Enter rating..."
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            max={5}
            min={0}
            required
          />
        </div>

        <div className="col-3">
          <button type="submit" className="btn btn-primary mb-3">
            {activeReview ? "Update review" : "Submit review"}
          </button>
        </div>
      </form>
    </div>
  );
};
