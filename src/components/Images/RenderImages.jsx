import React from "react";

export const RenderImages = ({ images }) => {
  return (
    <div className="pt-2">
      <div className="row">
        {images.map((image) => (
          <div className="col-3" key={image}>
            <img src={image} alt={image} className="spot-image rounded" />
          </div>
        ))}
      </div>
    </div>
  )
};
