export const getAccessTokens = () => {
  const storedAccessTokens = localStorage.getItem("accessTokens");
  return storedAccessTokens
    ? JSON.parse(storedAccessTokens)
    : { access: null, refresh: null };
};
