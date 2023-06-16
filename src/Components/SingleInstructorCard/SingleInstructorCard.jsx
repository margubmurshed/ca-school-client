import React from "react";
import { Slide,Fade } from "react-awesome-reveal";
import { Link } from "react-router-dom";

const SingleInstructorCard = ({ instructorItem }) => {
  return (
    <Fade triggerOnce>
      <div className="card bg-gray-100 shadow-xl rounded-none border border-ca-dark border-opacity-10">
        <figure className="mt-5">
          <img
            src={instructorItem?.image}
            alt="class_image"
            className="w-64 h-64 object-cover rounded-full"
          />
        </figure>
        <div className="card-body gap-1 text-center">
          <h2 className="text-3xl font-bold">{instructorItem?.name}</h2>
          <p className="text-gray-400">{instructorItem?.email}</p>
          <div className="card-actions justify-between items-center mt-5">
            <span className="badge badge-neutral badge-outline">
              Total Students: {instructorItem?.total_students}
            </span>
            <Link to={`/instructor/${instructorItem._id}`}>
              <button className="btn bg-ca-primary text-white hover:bg-ca-secondary">
                see classes
              </button>
            </Link>
          </div>
        </div>
      </div>
    </Fade>
  );
};

export default SingleInstructorCard;
