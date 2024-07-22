import axios from "axios";

const baseURL = "http://localhost:5000/api/v1/";
export const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});

// axios.interceptors.response.use(
//   (response) => {
//     if (response.status === 401) {
//       console.log("user unautherized");

//       alert("You are not authorized");
//       window.location.href = "/sign-in";
//     }
//     return response;
//   },
//   (error) => {
//     if (error.response && error.response.data) {
//       return Promise.reject(error.response.data);
//     }
//     return Promise.reject(error.message);
//   }
// );

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      localStorage.clear();
      window.location.replace("/sign-in");
    }
  }
);
