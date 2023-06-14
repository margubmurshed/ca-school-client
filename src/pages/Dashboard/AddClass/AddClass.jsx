import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";

const AddClass = () => {
    const axiosSecure = useAxiosSecure();
  const auth = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const handleAddClass = async(data) => {
    const formData = new FormData();
    formData.append("image", data.image[0])
    const response = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOSTING_API}`, formData);
    const classData = {
        ...data,
        image: response.data.data.image.url,
        instructor_email: auth.user.email,
        instructor: auth.user.displayName,
        available_seats: data.total_seats,
        status: "pending"
    }
    
    const result = await axiosSecure.post("/classes", classData, {
        headers: {
            email: auth.user.email,
            Authorization: `Bearer ${localStorage.getItem("access-token")}`
        }
    })
    
    if(result.data.insertedId){
        Swal.fire("Success!", "New Class Added!", "success");
        navigate("/dashboard/my-classes")
    }
  };
  return (
    <section className="p-5">
      <div className="shadow-lg md:w-[500px] p-5 bg-gray-200">
        <form onSubmit={handleSubmit(handleAddClass)}>
          <h2 className="text-center text-2xl font-bold uppercase">
            Add New Class
          </h2>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Class Name</span>
            </label>
            <input
              type="text"
              placeholder="Enter your class name"
              className="input input-bordered w-full"
              {...register("name", { required: true })}
            />
            {errors.name?.type === "required" && (
              <p className="text-red-500 mt-2">Name field is required</p>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Thumbnail Image</span>
            </label>
            <input
              type="file"
              className="file-input file-input-bordered file-input-primary w-full"
              {...register("image", { required: true })}
            />
            {errors.image?.type === "required" && (
              <p className="text-red-500 mt-2">Image is required</p>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Instructor Name</span>
            </label>
            <input
              type="text"
              placeholder="Enter your class instructor name"
              className="input input-bordered w-full"
              value={auth.user.displayName}
              disabled={auth.user.displayName}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Instructor Email</span>
            </label>
            <input
              type="text"
              placeholder="Enter your class instructor email"
              className="input input-bordered w-full"
              value={auth.user.email}
              disabled={auth.user.email}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Total Seats</span>
            </label>
            <input
              type="number"
              placeholder="Enter total seats"
              className="input input-bordered w-full"
              {...register("total_seats", { required: true, min: 1 })}
            />
            {errors.total_seats?.type === "required" && (
              <p className="text-red-500 mt-2">
                total Seats field is required
              </p>
            )}
            {errors.total_seats?.type === "min" && (
              <p className="text-red-500 mt-2">
                Total Seats should more than 0
              </p>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Price</span>
            </label>
            <input
              type="number"
              placeholder="Enter price"
              className="input input-bordered w-full"
              {...register("price", { required: true, min: 1 })}
            />
            {errors.price?.type === "required" && (
              <p className="text-red-500 mt-2">Price field is required</p>
            )}
            {errors.price?.type === "min" && (
              <p className="text-red-500 mt-2">Price should more than 0</p>
            )}
          </div>
          <div className="form-control mt-5">
            <input
              type="submit"
              value="Add Class"
              className="btn btn-neutral"
            />
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddClass;
