import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const MyClasses = () => {
  const auth = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: classes = [], isLoading: classesLoading } = useQuery({
    queryKey: ["instructor-classes", auth.user],
    queryFn: async () => {
      const result = await axiosSecure.get(
        `/instructor/classes?email=${auth.user.email}`,
        {
          headers: {
            email: auth.user.email,
            Authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        }
      );
      return result.data;
    },
  });

  if (classesLoading)
    return (
      <div className="flex justify-center items-center h-[500px]">
        <span className="loading loading-spinner loading-lg text-ca-primary"></span>
      </div>
    );

  return (
    <section className="p-5 w-full h-full">
      <h2 className="text-center mb-10 text-4xl font-bold uppercase">
        My <span className="text-ca-primary">Classes</span>
      </h2>
      <div className="space-y-5 md:w-3/4 mx-auto">
        {classes.length ? (
          classes.map((item) => (
            <div
              className={`card lg:card-side bg-base-100 shadow-xl ${item.status === "approved" ? "border border-green-500": ""}`}
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
                <div className="card-actions justify-end items-center">
                  {item.status === "approved" &&
                    item.total_seats - item.available_seats && (
                      <div className="badge badge-neutral">
                        Enrolled : {item.total_seats - item.available_seats}
                      </div>
                    )}
                  <button
                    className={`btn btn-sm ${
                      item.status === "approved"
                        ? "disabled:bg-green-500 disabled:text-white"
                        : item.status === "denied"
                        ? "disabled:bg-red-500"
                        : ""
                    }`}
                    disabled
                  >
                    {item.status}
                  </button>
                  <button className="btn btn-sm btn-secondary">Update</button>
                  {item.feedback && item.status === "denied" && (
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() =>
                        Swal.fire({
                          title: "Feedback",
                          html: `<p>${item.feedback}</p>`,
                        })
                      }
                    >
                      Feedback
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="font-thin h-[400px] flex items-center justify-center">
            No Classes Added Yet
          </p>
        )}
      </div>
    </section>
  );
};

export default MyClasses;
