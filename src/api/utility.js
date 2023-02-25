export const request = async (method, url, headers = {}, body = {}) => {
  const response = await fetch(url, {
    method,
    headers,
    ...(method !== "GET" ? { body } : {}),
  });
  const parsedResponse = await response.json();

  return parsedResponse;
};
