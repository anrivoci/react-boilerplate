//other-libs
import axios from "axios";
import dayjs from "dayjs";
import { jwtDecode } from "jwt-decode";
//helpers
import { serverURL, getAccessTokens } from "../../helpers";

export const handleLogOut = () => {
  localStorage.removeItem("authTokens");
  window.location.href = "/login";
};

export const refreshAccessToken = async (refreshToken: string) => {
  try {
    const response = await axios.post(`${serverURL}/auth/refresh`, {
      token: refreshToken,
    });

    const { accessToken } = response.data;
    const tokens = getAccessTokens(); // Retrieve existing tokens

    const updatedTokens = {
      accessToken: accessToken,
      refreshToken: tokens?.refreshToken, // Change if server sends a refreshToken,
    };

    localStorage.setItem("authTokens", JSON.stringify(updatedTokens));

    return accessToken;
  } catch (error) {
    handleLogOut();
    return null;
  }
};

export const isTokenExpired = (token: string) => {
  const decoded: { exp?: number } = jwtDecode(token);
  return decoded.exp ? dayjs.unix(decoded.exp).isBefore(dayjs()) : true;
};
