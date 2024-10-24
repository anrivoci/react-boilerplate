import axios from "axios";
//helpers
import { getAccessTokens, serverURL } from "../../helpers";
//services
import { isTokenExpired, refreshAccessToken } from "./services";

export const useAxios = () => {
  const instance = axios.create({
    baseURL: serverURL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  instance.interceptors.request.use(async (req) => {
    const tokens = getAccessTokens();
    if (!tokens?.accessToken) return req;

    const { accessToken, refreshToken } = tokens;

    if (isTokenExpired(accessToken)) {
      const newAccessToken = await refreshAccessToken(refreshToken);
      if (newAccessToken) {
        req.headers.Authorization = `Bearer ${newAccessToken}`;
      }
    } else {
      req.headers.Authorization = `Bearer ${accessToken}`;
    }

    return req;
  });

  instance.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error)
  );

  return instance;
};
