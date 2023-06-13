import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { BsFillTrashFill } from "react-icons/bs";
import { AiFillDollarCircle } from "react-icons/ai";
import Swal from "sweetalert2";

const SelectedClasses = () => {
  const axiosSecure = useAxiosSecure();
  const auth = useAuth();
  const {
    data: selectedClasses = [],
    isLoading: selectedClassesLoading,
    refetch,
  } = useQuery({
    queryKey: ["selected-classes"],
    queryFn: async () => {
      const result = await axiosSecure.get("/selections", {
        headers: {
          email: auth.user.email,
          Authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      });
      return result.data;
    },
  });

  const handleDeleteClass = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      const deletedResult = await axiosSecure.delete(`/selection/${id}`, {
        headers: {
          email: auth.user.email,
          Authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      });
      if (deletedResult.data.deletedCount) {
        Swal.fire("Success!", "Class Deleted Successfully!", "success");
        refetch();
      }
    }
  };

  if (selectedClassesLoading) {
    return (
      <div className="flex justify-center items-center h-[500px]">
        <span className="loading loading-spinner loading-lg text-ca-primary"></span>
      </div>
    );
  }
  return (
    <section className="p-5 w-full h-full">
      <h2 className="text-center mb-10 text-4xl font-bold uppercase">
        Selected <span className="text-ca-primary">Classes</span>
      </h2>
      <div className="space-y-5 md:w-3/4 mx-auto">
        {selectedClasses.map((item) => (
          <div
            className="card lg:card-side bg-base-100 shadow-xl"
            key={item._id}
          >
            <figure className="lg:w-1/3 h-[200px]">
              <img
                src={item.image}
                alt="Album"
                className="h-full w-full object-cover"
              />
            </figure>
            <div className="card-body lg:w-2/3">
              <h2 className="card-title">{item.name}</h2>
              <p>
                <b>Instructor : </b>
                {item.instructor}
              </p>
              <p>
                <b className="text-ca-primary">Price : </b>${item.price}
              </p>
              <div className="card-actions justify-end">
                <button
                  className="btn btn-error btn-sm"
                  onClick={() => handleDeleteClass(item._id)}
                >
                  <BsFillTrashFill size={20} /> Delete
                </button>
                <button className="btn btn-primary btn-sm">
                  <AiFillDollarCircle size={20} /> Pay Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SelectedClasses;
