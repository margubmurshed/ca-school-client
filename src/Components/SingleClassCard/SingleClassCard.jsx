import React from "react";

const SingleClassCard = ({ classItem }) => {
  return (
    <div className="card bg-base-100 shadow-xl rounded-none">
      <figure>
        <img src={classItem?.image} alt="class_image" className="w-full h-64 object-cover"/>
      </figure>
      <div className="card-body gap-1">
        <h2 className="card-title text-lg tracking-tight font-bold">{classItem?.name?.length > 65 ? `${classItem?.name.substr(0, 65)}...` : classItem?.name}</h2>
        <p className="text-gray-400">{classItem?.instructor}</p>
        <h2 className="card-title text-ca-primary font-bold">${classItem?.price}</h2>
        <div className="card-actions justify-between items-center">
          <span className="badge badge-neutral badge-outline">Available Seats: {classItem?.available_seats}</span>
          <button className="btn bg-ca-primary text-white hover:bg-ca-secondary" disabled={!classItem?.available_seats}>Select</button>
        </div>
      </div>
    </div>
  );
};

export default SingleClassCard;
