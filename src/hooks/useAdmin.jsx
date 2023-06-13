import React from "react";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";

const useAdmin = () => {
  const axiosSecure = useAxiosSecure();
  const auth = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ["admin", auth.user, localStorage.getItem("access-token")],
    queryFn: async () => {
      if (auth.user && localStorage.getItem("access-token")) {
        const response = await axiosSecure.get("/verifyAdmin", {
          headers: {
            email: auth.user?.email,
            Authorization: `Bearer ${localStorage.getItem("access-token")}`
          },
        });
        return response.data.admin;
      } else {
        return false;
      }
    },
  });

  return [data, isLoading];
};

export default useAdmin;
