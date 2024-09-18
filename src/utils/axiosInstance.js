import Axios from "axios";

const baseURL = import.meta.env.VITE_API_URL;

const axios = Axios.create({
  baseURL,
});

axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // console.log("Error: ", error);
    if (error.response.status === 401) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      window.location.href = "/";
    }

    // return error;
    return Promise.reject(error);
  }
);
export default axios;
