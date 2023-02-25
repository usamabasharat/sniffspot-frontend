import { createContext, useEffect, useState } from "react";
import { fetchSpots } from "api/spots";

export const SpotContext = createContext([]);

export const SpotContextProvider = ({ children }) => {
  const [spots, setSpots] = useState([]);
  const [currentSpot, setCurrentSpot] = useState(null);

  useEffect(() => {
    const getSpots = async () => {
      const data = await fetchSpots();

      setSpots(data);
    };

    getSpots();
  }, [setSpots]);

  return (
    <SpotContext.Provider value={{ spots, setSpots, currentSpot, setCurrentSpot }}>
      {children}
    </SpotContext.Provider>
  );
};
