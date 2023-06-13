import { useEffect } from "react";
import axios from "axios";

const useAxiosSecure = () => {
  const axiosSecure = axios.create({ baseURL: "http://localhost:5000" });

  // Request interceptor
  useEffect(() => {
    const requestInterceptor = axiosSecure.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("access-token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        // Handle request errors here
        return Promise.reject(error);
      }
    );

    // Response interceptor
    const responseInterceptor = axiosSecure.interceptors.response.use(
      (response) => {
        // Modify the response data here
        return response;
      },
      (error) => {
        // Handle response errors here
        return Promise.reject(error);
      }
    );

    // Clean up the interceptors on component unmount
    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  return axiosSecure;
};

export default useAxiosSecure;
