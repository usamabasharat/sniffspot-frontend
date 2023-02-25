import { request } from "./utility";

const baseUrl = `${process.env.REACT_APP_API_URL}/spots/:spot_id/reviews`;
const headers = {
  "Content-Type": "application/json",
};

export const createReview = async (spotId, payload) => {
  const response = await request(
    "POST",
    baseUrl.replace(":spot_id", spotId),
    headers,
    JSON.stringify(payload)
  );

  return response;
};

export const updateReview = async (reviewId, payload) => {
  let url = `${process.env.REACT_APP_API_URL}/reviews/${reviewId}`;
  const response = await request("PUT", url, headers, JSON.stringify(payload));

  return response;
};
