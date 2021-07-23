import axios from "axios";
import store from "../store/index";

const jwtInterceptor = axios.create({});

jwtInterceptor.interceptors.request.use((config) => {
  const authData = localStorage.getItem("accessToken");
  if (authData == null) {
    return config;
  }
  config.headers.common["x-access-token"] = authData;
  return config;
});

jwtInterceptor.interceptors.response.use(
  (response) => {
    return response;
  },
  async (err) => {
    if (err.response.status === 500) {
      const authData = localStorage.getItem("refreshToken");

      try {
        var response = await axios.post(
          `http://localhost:5000/api/v1/auth/refresh-token1`,
          {
            token: authData,
          }
        );
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);
        if (response) {
          store.dispatch("User/getUser", response.data.accessToken);
        }
      } catch (error) {
        this.router.push("/");
      }
      err.config.headers["x-access-token"] = response.data.accessToken;
      return axios(err.config);
    } else {
      return Promise.reject(err);
    }
  }
);

export default jwtInterceptor;
