import { request } from "./utility";

const baseUrl = `${process.env.REACT_APP_API_URL}/spots`;

export const fetchSpots = async () => {
  const response = await request("GET", baseUrl);

  return response;
};

export const createSpot = async (formData) => {
  const response = await request("POST", baseUrl, {}, formData);

  return response;
};

export const updateSpot = async (spotId, data) => {
  const headers = {
    "Content-Type": "application/json",
  };
  const response = await request("PATCH", `${baseUrl}/${spotId}`, headers, JSON.stringify(data));

  return response;
};
