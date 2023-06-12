import React, { useContext } from "react";
import signupImg from "../../assets/Images/signup/signup.png";
import { useForm } from "react-hook-form";
import { authContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate, Navigate, Link } from "react-router-dom";
import SocialLogin from "../../shared/SocialLogin/SocialLogin";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { user, setUserLoading, createEmailPassUser, updateUser } =
    useContext(authContext);
  const navigate = useNavigate();
  const handleUserSignup = async (data) => {
    if (data.confirmPassword === data.password) {
      try {
        await createEmailPassUser(data.email, data.password);
        await updateUser(data.name, data.photourl);
        Swal.fire("Success!", "Signed Up Successfully!", "success");
        navigate("/login");
      } catch (err) {
        setUserLoading(false);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.message,
        });
      }
    }
  };

  if (user) return <Navigate to="/" />;

  return (
    <section>
      <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-5 md:place-items-center items-center p-5">
        <div className="hidden lg:block">
          <img src={signupImg} alt="sign up image" />
        </div>
        <div
          className="shadow-lg md:w-[500px] p-5 bg-gray-200"
          onSubmit={handleSubmit(handleUserSignup)}
        >
          <h2 className="text-center text-2xl font-bold uppercase">Sign Up</h2>
          <form>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="input input-bordered w-full"
                {...register("name", { required: true })}
              />
              {errors.name?.type === "required" && (
                <p className="text-red-500 mt-2">Name field is required</p>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo URL</span>
              </label>
              <input
                type="text"
                placeholder="Enter your photo url"
                className="input input-bordered w-full"
                {...register("photourl", { required: true })}
              />
              {errors.photourl?.type === "required" && (
                <p className="text-red-500 mt-2">Photo URL field is required</p>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered w-full"
                {...register("email", { required: true })}
              />
              {errors.email?.type === "required" && (
                <p className="text-red-500 mt-2">Email field is required</p>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="text"
                placeholder="Enter your password"
                className="input input-bordered w-full"
                {...register("password", {
                  required: true,
                  pattern:
                    /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])(.{6,})$/,
                })}
              />
              {errors.password?.type === "required" && (
                <p className="text-red-500 mt-2">Password field is required</p>
              )}
              {errors.password?.type === "pattern" && (
                <p className="text-red-500 mt-2">
                  Password should be at least 6 characters which contains a
                  special character and a capital letter
                </p>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                type="text"
                placeholder="Enter your password again"
                className="input input-bordered w-full"
                {...register("confirmPassword", { required: true })}
              />
              {errors.confirmPassword?.type === "required" && (
                <p className="text-red-500 mt-2">
                  Confirm Password field is required
                </p>
              )}
            </div>
            <div className="form-control mt-5">
              <input
                type="submit"
                value="Sign Up"
                className="btn btn-neutral"
              />
            </div>
          </form>
          <Link to="/login" className="link text-ca-primary block text-center mt-5">Already an user? Login now</Link>
          <SocialLogin />
        </div>
      </div>
    </section>
  );
};

export default Signup;
