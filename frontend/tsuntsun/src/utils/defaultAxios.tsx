import axios from "axios";
import { accessToken } from "../contexts/AuthContext";

const createAxiosInstance = () => {
  const axiosInstance = axios.create({
    baseURL: "https://tsuntsun-api.herokuapp.com/api/",
  });

  axiosInstance.interceptors.request.use((request) => {
    request.headers["Authorization"] = accessToken();
    console.dir("request", request);
    return request;
  });

  axiosInstance.interceptors.response.use(
    (response) => {
      console.dir("response", response);
      return response;
    },
    (error) => {
      console.log("error", error);
    }
  );
  return axiosInstance;
};

const defaultAxios = createAxiosInstance();

export default defaultAxios;
