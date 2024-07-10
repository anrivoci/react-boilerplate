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
    localStorage.removeItem("accessTokens");
    window.location.href = "/login";
  };

  instance.interceptors.request.use(async (req) => {
    let accessTokens = getAccessTokens();

    if (!accessTokens?.access) return req;

    try {
      const decoded: { exp?: number } = jwtDecode(accessTokens.access);

      if (decoded.exp) {
        const isExpired = dayjs.unix(decoded.exp).diff(dayjs()) < 1000;

        if (isExpired) {
          try {
            const response = await axios.post(`${serverURL}/auth/refresh`, {
              refreshToken: accessTokens?.refresh,
            });

            accessTokens = {
              access: response.data.token,
              refresh: response.data.refreshToken,
            };
            localStorage.setItem("accessTokens", JSON.stringify(accessTokens));
          } catch (error) {
            handleLogOut();
          }
        }

        req.headers.Authorization = `Bearer ${accessTokens.access}`;
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
