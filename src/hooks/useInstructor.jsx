import React from "react";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";

const useInstructor = () => {
  const axiosSecure = useAxiosSecure();
  const auth = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ["instructor", auth.user, localStorage.getItem("access-token")],
    queryFn: async () => {
      if (auth.user && localStorage.getItem("access-token")) {
        const response = await axiosSecure.get("/verifyInstructor", {
          headers: {
            email: auth.user?.email,
            Authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        });
        return response.data.instructor;
      } else return false;
    },
  });

  return [data, isLoading];
};

export default useInstructor;
