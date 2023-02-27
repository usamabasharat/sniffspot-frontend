import React from 'react';
import { useState } from "react";

import './SlideShow.scss'


export const Slideshow = ({spotImages}) => {
  const [current, setCurrent] = useState(0)

  const goBack = () => {
    current >= spotImages.length - 1 ? setCurrent(0) : setCurrent(current + 1)
  }

  const goForward = () => {
    current === 0 ? setCurrent(spotImages.length - 1) : setCurrent(current - 1)
  }

  return(
    <div className="slide-container">
      <div
        className="image-container">
        <img className='slide-img' src={spotImages[current]} alt=''/>
        <div className="controls">
          <button className="controls__button" onClick={goBack}>
            {'<'}
          </button>
          <button className="controls__button" onClick={goForward}>
            {'>'}
          </button>
        </div>
      </div>
    </div>
  )
}
