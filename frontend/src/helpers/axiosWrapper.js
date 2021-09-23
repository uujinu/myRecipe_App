import axios from "axios";
import router from "next/router";
import { store } from "../../redux/store";
import { refreshJWT } from "@slice/login";

export default function axiosWrapper(method, url, data=null, callback, errors=()=>{}) {
  const token = store.getState().login.accessJWT;
  const user_id = store.getState().user.user.pk;
  axios.defaults.baseURL = "http://localhost:8000";
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  //axios.defaults.headers.post["Content-type"] = "application/json";

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      const status = error.response ? error.response.status : null
      const originalRequest = error.config;
      if (status === 401 && !originalRequest.__retry) { // unauthorized error
        originalRequest.__retry = true;
  
        if (user_id === null) {
            alert("권한이 없습니다. 로그인을 해주세요.");
            console.log("error: ", error);
            router.push("/");
        }
        
        const temp = axios.create({headers: {"Content-type": "application/json"}, withCredentials: true});      
        return temp.post("/token/refresh/", {"user_id": user_id})
        .then((res) => {
            const newAccessToken = res.data.access;
            store.dispatch(refreshJWT(newAccessToken))
            axios.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
            originalRequest.headers = { "Authorization": `Bearer ${newAccessToken}` };
            originalRequest.baseURL = undefined;
            // 재요청
            return axios.request(originalRequest);
        })//;
        .catch((e) => {
          console.log("refresh token expired!!");
          return Promise.reject(e);
        })
      } else {
          alert("로그인 연장에 실패했습니다. 다시 로그인해주세요.")
          router.push("/");
          return Promise.reject(error);
      }
  });

  const promise =  axios({
    method : `${method}`,
    url : `${url}`,
    data : data
  });

  const dataPromise = promise.then((response) => response.data);
  return dataPromise;
}
