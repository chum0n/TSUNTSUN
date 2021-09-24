import axios from "axios";
import { accessToken } from "../contexts/AuthContext";

const createAxiosInstance = () => {
  const axiosInstance = axios.create({
    baseURL: "https://tsuntsun-api.herokuapp.com/api/",
  });

  axiosInstance.interceptors.request.use((request) => {
    request.headers["Authorization"] = "Bearer:" + accessToken();
    console.log("request");
    console.dir(request);
    return request;
  });

  axiosInstance.interceptors.response.use(
    (response) => {
      console.log("response");
      console.dir(response);
      return response;
    },
    (error) => {
      console.log("error");
      console.log(error);
    }
  );
  return axiosInstance;
};

const defaultAxios = createAxiosInstance();

export default defaultAxios;
