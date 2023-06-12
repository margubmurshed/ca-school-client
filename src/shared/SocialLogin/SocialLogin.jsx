import React from "react";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { BsGoogle } from "react-icons/bs";

const SocialLogin = () => {
  const { loginGoogle, disableLoading } = useAuth();
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      await loginGoogle();
      Swal.fire("Success!", "Signed In Successfully!", "success");
      navigate("/");
    } catch (err) {
      disableLoading(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.message,
      });
    }
  };
  return (
    <div className="text-center mt-5 space-y-2">
        <h3>OR, Use Social Logins</h3>
      <button onClick={handleGoogleLogin} className="btn btn-outline btn-circle btn-sm">
        <BsGoogle size={20} />
      </button>
    </div>
  );
};

export default SocialLogin;
