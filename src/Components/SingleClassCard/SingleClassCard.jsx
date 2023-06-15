import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const SingleClassCard = ({ classItem, admin, instructor }) => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const auth = useAuth();
  const handleSelect = async(classItem) => {
    if(auth.user){
      const data = {
        classId: classItem._id,
        name: classItem.name,
        instructor: classItem.instructor,
        price: classItem.price,
        image: classItem.image,
        email: auth.user.email,
        instructor_email: classItem.instructor_email
      }
      try{
        const result = await axiosSecure.post("/selections", data, {
          headers: {
            email: auth.user.email,
            Authorization: `Bearer ${localStorage.getItem("access-token")}`
          }
        })
        if(result.data.insertedId) {
          Swal.fire("Success!", "Class Selected Successfully!", "success");
        }
      } catch(err){
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Class Already Selected or Something went wrong",
        });
      }
    } else{
      Swal.fire({
        icon: "warning",
        title: "Warning!",
        text: "Login first to select a class",
      });
      navigate("/login");
    }
  }
  return (
    <div className={`card bg-base-100 shadow-xl rounded-none ${classItem?.available_seats ? "" : "bg-red-100"}`}>
      <figure>
        <img src={classItem?.image} alt="class_image" className="w-full h-64 object-cover"/>
      </figure>
      <div className="card-body gap-1">
        <h2 className="card-title text-lg tracking-tight font-bold">{classItem?.name?.length > 65 ? `${classItem?.name.substr(0, 65)}...` : classItem?.name}</h2>
        <p className="text-gray-400">{classItem?.instructor}</p>
        <h2 className="card-title text-ca-primary font-bold">${classItem?.price}</h2>
        <div className="card-actions justify-between items-center">
          <span className="badge badge-neutral badge-outline">Available Seats: {classItem?.available_seats}</span>
          <button className="btn bg-ca-primary text-white hover:bg-ca-secondary" onClick={() => handleSelect(classItem)} disabled={!classItem?.available_seats || admin || instructor}>Select</button>
        </div>
      </div>
    </div>
  );
};

export default SingleClassCard;
