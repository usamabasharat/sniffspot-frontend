import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SpotContext } from "contexts/SpotContext";
import PlaceholderImage from "assets/placeholder.jpg"
import { ReactComponent as StarIcon } from "assets/star.svg";
import './Spots.scss';

export const Spots = () => {
  const navigate = useNavigate();
  const { spots } = useContext(SpotContext);

  const getImageSrc = (spot) =>
    spot.image_urls.length ? spot.image_urls[0] : PlaceholderImage;

  if (!spots) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="container py-3">
      <div className="row align-items-center">
        <div className="col-10">
          <h1>Spots List</h1>
        </div>

        <div className="col-2">
          <button
            className="btn btn-small btn-primary"
            onClick={() => navigate("/spots/new")}
          >
            Add new spot
          </button>
        </div>
      </div>

      <div className="row">
        {spots.map((spot) => (
          <div className="col-4 mb-3" key={spot.id}>
            <Link to={`/spots/${spot.id}`} className="text-decoration-none text-black">
              <div className="card">
                <img
                  src={getImageSrc(spot)}
                  alt={spot.title}
                  className="card-img-top spot-image"
                />

                <div className="card-body">
                  <p>{spot.title}</p>
                  <p className="text-muted">{spot.description}</p>
                  <p className="row">
                    <span className="col">
                      <span className="fw-bold">{`$${spot.price}`}</span>
                      <span> dog / hour</span>
                    </span>
                    <span className="col spot-review"> <StarIcon />({spot.reviews.length})</span>
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
