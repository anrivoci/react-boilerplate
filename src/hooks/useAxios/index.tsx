//other-libs
import axios from "axios";
import dayjs from "dayjs";
import { jwtDecode } from "jwt-decode";
//helpers
import { getAccessTokens, serverURL } from "../../helpers";

export const useAxios = () => {
  const instance = axios.create({
    baseURL: serverURL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const handleLogOut = () => {
    localStorage.removeItem("accessToken");
    window.location.href = "/login";
  };

  instance.interceptors.request.use(async (req) => {
    const accessToken = getAccessTokens();

    if (!accessToken) return req;

    try {
      const decoded: { exp?: number } = jwtDecode(accessToken);

      if (decoded.exp) {
        const isExpired = dayjs.unix(decoded.exp).diff(dayjs()) < 1000;

        if (isExpired) {
          try {
            const response = await axios.post(`${serverURL}/auth/refresh`, {
              refreshToken: accessToken,
            });

            localStorage.setItem("accessToken", response.data.accessToken);
          } catch (error) {
            handleLogOut();
          }
        }

        req.headers.Authorization = `Bearer ${accessToken}`;
      } else {
        handleLogOut();
      }
    } catch (error) {
      handleLogOut();
    }

    return req;
  });

  instance.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      // Enter your custom pop up
      // to display all network request
      // errors dynamically here!
      return Promise.reject(error);
    }
  );

  return instance;
};
