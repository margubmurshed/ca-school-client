import React, { useState } from "react";
import useClasses from "../../../hooks/useClasses";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { BsFillTrashFill } from "react-icons/bs";
import Swal from "sweetalert2";

const ManageClasses = () => {
  const [classes, classesLoading, refetch] = useClasses();
  const auth = useAuth();
  const axiosSecure = useAxiosSecure();
  const [disabledSelect, setDisabledSelect] = useState(false);
  const handleStatusChange = async(e, id) => {
    setDisabledSelect(true);
    const status = e.target.value;
    const result = await axiosSecure.patch(`/class/${id}/status?status=${status}`,null,{
        headers: {
            email: auth.user.email,
            Authorization: `Bearer ${localStorage.getItem("access-token")}`
        }
    })
    if(result.data.modifiedCount) {
        Swal.fire("Success!", "Status Updated Successfully!", "success");
        refetch();
    }
    setDisabledSelect(false);
  }
  const handleSendFeedback = async(id) => {
    const { value: feedback } = await Swal.fire({
        input: 'textarea',
        inputLabel: 'Message',
        inputPlaceholder: 'Type your message here...',
        inputAttributes: {
          'aria-label': 'Type your message here'
        },
        showCancelButton: true
      })
      if (feedback) {
        setDisabledSelect(true);
        const result = await axiosSecure.put(`/class/${id}/feedback`,{feedback},{
            headers: {
                email: auth.user.email,
                Authorization: `Bearer ${localStorage.getItem("access-token")}`
            }
        })
        if(result.data.modifiedCount) {
            Swal.fire("Success!", "Feedback Added Successfully!", "success");
        }
        setDisabledSelect(false)
      }
  }
  if (classesLoading)
    return (
      <div className="flex justify-center items-center h-[500px]">
        <span className="loading loading-spinner loading-lg text-ca-primary"></span>
      </div>
    );
  return (
    <section className="w-full h-full p-5">
      <h2 className="text-center mb-10 text-4xl font-bold uppercase">
        Manage <span className="text-ca-primary">Classes</span>
      </h2>
      <div className="overflow-x-auto">
        <table className="table table-xs">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Image</th>
              <th>Name</th>
              <th>Instructor</th>
              <th>Instructor Email</th>
              <th>Available Seats</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {classes.map((item, index) => (
              <tr key={item._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={item.image} alt={item.name} />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{item.name}</td>
                <td>{item.instructor}</td>
                <td>{item.instructor_email}</td>
                <td>{item.available_seats}</td>
                <td>{item.price}</td>
                <td>
                  <select
                    className={`select select-bordered select-sm w-full ${
                      item.status === "approved"
                        ? "border-green-500"
                        : item.status === "denied"
                        ? "border-red-500"
                        : ""
                    }`}
                    defaultValue={item.status}
                    onChange={(e) => handleStatusChange(e, item._id)}
                    disabled={disabledSelect}
                  >
                    <option value="approved">Approved</option>
                    <option value="pending">Pending</option>
                    <option value="denied">Denied</option>
                  </select>
                </td>
                <th>
                  <button className="btn btn-secondary btn-xs" onClick={() => handleSendFeedback(item._id)} disabled={disabledSelect || item.status==='pending'}>Feedback</button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ManageClasses;
