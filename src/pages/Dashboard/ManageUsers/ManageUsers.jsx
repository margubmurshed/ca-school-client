import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const auth = useAuth();
  const [processing, setProcessing] = useState(false);
  const config = {
    headers: {
      email: auth.user.email,
      Authorization: `Bearer ${localStorage.getItem("access-token")}`,
    },
  }
  const { data: users, isLoading: usersLoading, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const result = await axiosSecure.get("/users", config);
      return result.data;
    },
  });

  const handleMakeAdmin = async(id) => {
    setProcessing(true)
    const result = await axiosSecure.patch(`/makeAdmin/${id}`,null, config);
    if(result.data.modifiedCount){
        Swal.fire("Success!", "Made Admin Successfully!", "success");
        refetch();
    }
    setProcessing(false)
  };

  const handleMakeInstructor = async(id) => {
    setProcessing(true)
    const result = await axiosSecure.patch(`/makeInstructor/${id}`,null, config);
    if(result.data.modifiedCount){
        Swal.fire("Success!", "Made Instructor Successfully!", "success");
        refetch();
    }
    setProcessing(false)
  };

  if (usersLoading)
    return (
      <div className="flex justify-center items-center h-[500px]">
        <span className="loading loading-spinner loading-lg text-ca-primary"></span>
      </div>
    );
  return (
    <section className="w-full h-full p-5">
      <h2 className="text-center mb-10 text-4xl font-bold uppercase">
        Manage <span className="text-ca-primary">Users</span>
      </h2>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((item, index) => (
              <tr key={item._id}>
                <th>{index + 1}</th>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td className="capitalize font-semibold underline underline-offset-4 select-none">{item.role}</td>
                <td className="space-x-2">
                  <button
                    className="btn btn-accent btn-xs"
                    onClick={() => handleMakeAdmin(item._id)}
                    disabled={processing || item.email === auth.user.email || item.role === "admin"}
                  >
                    Make Admin
                  </button>
                  <button
                    className="btn btn-info btn-xs"
                    onClick={() => handleMakeInstructor(item._id)}
                    disabled={processing || item.email === auth.user.email || item.role === "instructor"}
                  >
                    Make Instructor
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ManageUsers;
