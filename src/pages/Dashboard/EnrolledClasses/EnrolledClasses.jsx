import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import SingleClassCard from "../../../Components/SingleClassCard/SingleClassCard";

const EnrolledClasses = () => {
  const axiosSecure = useAxiosSecure();
  const auth = useAuth();
  const { data: enrollments = [], isLoading: enrollmentsLoading } = useQuery({
    queryKey: ["enrollments"],
    queryFn: async () => {
      const result = await axiosSecure.get("/enrollments", {
        headers: {
          email: auth.user.email,
          Authorization: localStorage.getItem("access-token"),
        },
      });
      if (result.data.length) {
        result.data.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date)
        );
      }
      return result.data;
    },
  });

  if (enrollmentsLoading)
    return (
      <div className="flex justify-center items-center h-[500px]">
        <span className="loading loading-spinner loading-lg text-ca-primary"></span>
      </div>
    );

  return (
    <section className="p-5 w-full h-full">
      <h2 className="text-center mb-10 text-4xl font-bold uppercase">
        Enrolled <span className="text-ca-primary">Classes</span>
      </h2>
      {enrollments.length ? (
        <div className="grid lg:grid-cols-2 gap-5">
          {/* sorted descending order based on number of students enrolled */}
          {enrollments.map((classItem) => (
            <div
              className={`card bg-base-100 shadow-xl rounded-none ${
                classItem?.available_seats ? "" : "bg-red-100"
              }`}
              key={classItem._id}
            >
              <figure>
                <img
                  src={classItem?.image}
                  alt="class_image"
                  className="w-full h-64 object-cover"
                />
              </figure>
              <div className="card-body gap-1">
                <h2 className="card-title text-lg tracking-tight font-bold">
                  {classItem?.name?.length > 65
                    ? `${classItem?.name.substr(0, 65)}...`
                    : classItem?.name}
                </h2>
                <p className="text-gray-400">{classItem?.instructor}</p>
                <h2 className="card-title text-ca-primary font-bold">
                  ${classItem?.price}
                </h2>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="font-thin h-[400px] flex items-center justify-center">
          No Enrollments Done Yet
        </p>
      )}
    </section>
  );
};

export default EnrolledClasses;
