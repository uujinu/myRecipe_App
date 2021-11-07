/* eslint-disable no-underscore-dangle */
import axios from "axios";
import router from "next/router";
import { refreshJWT } from "@slice/login";
import { store } from "../../redux/store";

export default function axiosWrapper(
  method,
  url,
  data = null,
  callback,
  errors = () => {},
) {
  const token = store.getState().login.accessJWT;
  const userId = store.getState().user.user.pk;
  axios.defaults.baseURL = "http://localhost:8000";
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;

  axios.interceptors.response.use(
    (response) => response,
    // eslint-disable-next-line consistent-return
    async (error) => {
      const status = error.response ? error.response.status : null;
      const originalRequest = error.config;
      if (status === 401 && !originalRequest.__retry) {
        originalRequest.__retry = true;

        if (userId === null) {
          alert("권한이 없습니다. 로그인을 해주세요.");
          console.log("error: ", error);
          router.push("/");
        }

        const temp = axios.create({
          headers: { "Content-type": "application/json" },
          withCredentials: true,
        });
        return temp
          .post("/token/refresh/", { user_id: userId })
          .then((res) => {
            const newAccessToken = res.data.access;
            store.dispatch(refreshJWT(newAccessToken));
            axios.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
            originalRequest.headers = {
              Authorization: `Bearer ${newAccessToken}`,
            };
            originalRequest.baseURL = undefined;
            // 재요청
            return axios.request(originalRequest);
          })
          .catch((e) => {
            console.log("refresh token expired!!");
            return Promise.reject(e);
          });
      }
      if (status === 404) {
        alert("404 error");
      } else {
        alert("로그인 연장에 실패했습니다. 다시 로그인해주세요.");
        return Promise.reject(error);
      }
    },
  );

  axios({
    method: `${method}`,
    url: `${url}`,
    data,
  })
    .then((res) => {
      console.log("axios res: ", res);
      callback(res);
    })
    .catch((e) => {
      console.error("axios err: ", e);
      errors(e);
    });
}
