import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Checkout from "./Checkout";

const stripePromise = loadStripe(
  "pk_test_51NH7VtIqAAfH706KOi5BYT8yS58EmksZuKr9vtarr5ZoD2GjlYkzb9qrwFY5mcC6bIzb9yWbGXVFPyROI4AtTg7g00R2qRqJcD"
);

const Payment = () => {
  const location = useLocation();
  const axiosSecure = useAxiosSecure();
  const auth = useAuth();
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    axiosSecure
      .post(
        "/create-payment-intent",
        { amount: location.state.item.price },
        {
          headers: {
            email: auth.user.email,
            Authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        }
      )
      .then((res) => setClientSecret(res.data.clientSecret));
  }, []);

  const item = location?.state?.item;
  if(!item) return <Navigate to="/dashboard/selected-classes"/>
  return (
    <div className="w-full h-full p-5">
      {clientSecret && (
        <div className="shadow-lg p-10 border">
          <Elements stripe={stripePromise}>
            <Checkout
              clientSecret={clientSecret}
              classId={item.classId}
              instructor_email={item.instructor_email}
              selectionId={item._id}
              amount={item.price}
            />
          </Elements>
        </div>
      )}
    </div>
  );
};

export default Payment;
