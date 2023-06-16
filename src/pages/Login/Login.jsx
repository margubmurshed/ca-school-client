import React, { useContext, useState } from "react";
import loginImg from "../../assets/Images/login/login2.svg";
import { useForm } from "react-hook-form";
import { authContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import SocialLogin from "../../shared/SocialLogin/SocialLogin";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { user, setUserLoading, loginEmailPassUser } = useContext(authContext);
  const navigate = useNavigate();
  const handleUserLogin = async (data) => {
    try {
      await loginEmailPassUser(data.email, data.password);
      Swal.fire("Success!", "Signed In Successfully!", "success");
      navigate("/");
    } catch (err) {
      setUserLoading(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.message,
      });
    }
  };

  if (user && user.displayName) return <Navigate to="/" />;
  return (
    <section>
      <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-5 md:place-items-center items-center p-5">
        <div className="shadow-lg md:w-[500px] p-5 bg-base-200">
          <form onSubmit={handleSubmit(handleUserLogin)}>
            <h2 className="text-center text-2xl font-bold uppercase">Login</h2>
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
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="input input-bordered w-full"
                  {...register("password", {
                    required: true,
                    pattern:
                      /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])(.{6,})$/,
                  })}
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 z-20"
                >
                  {setShowPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                </span>
              </div>
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
            <div className="form-control mt-5">
              <input type="submit" value="Login" className="btn btn-neutral" />
            </div>
          </form>
          <Link to="/signup" className=" text-ca-primary block text-center mt-5">New to this website? Signup now</Link>
          <SocialLogin />
        </div>
        <div className="hidden lg:block">
          <img src={loginImg} alt="sign up image" />
        </div>
      </div>
    </section>
  );
};

export default Login;
