export const getAccessTokens = () => {
  const storedTokens = localStorage.getItem("authTokens");

  // If storedTokens is null, return an empty object to avoid destructuring errors
  if (!storedTokens) return {};

  return JSON.parse(storedTokens);
};
