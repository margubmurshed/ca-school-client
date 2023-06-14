import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Checkout = ({ clientSecret, classId, selectionId, amount }) => {
  const auth = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const location = useLocation();
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    setProcessing(true);
    const response = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
        billing_details: {
          name: auth.user.displayName,
          email: auth.user.email,
        },
      },
    });

    if (response.paymentIntent.status === "succeeded") {
      const availableSeatsResult = await axiosSecure.put(
        `/class/${classId}/available-seats`,
        null,
        {
          headers: {
            email: auth.user.email,
            Authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        }
      );
      const totalStudentsResult = await axiosSecure.put(
        `/instructor/${classId}/total-students`,
        null,
        {
          headers: {
            email: auth.user.email,
            Authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        }
      );
      const selectionDeleteResult = await axiosSecure.delete(
        `/selection/${selectionId}`,
        {
          headers: {
            email: auth.user.email,
            Authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        }
      );

      const payment = {
        name: auth.user.displayName,
        email: auth.user.email,
        selectionId,
        classId,
        amount,
        transactionId: response.paymentIntent.id,
      };
      const paymentPushResult = await axiosSecure.post("/payments", payment, {
        headers: {
          email: auth.user.email,
          Authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      });

      if (
        availableSeatsResult.data.modifiedCount &&
        totalStudentsResult.data.modifiedCount &&
        selectionDeleteResult.data.deletedCount &&
        paymentPushResult.data.insertedId
      )
        {
            Swal.fire("Success!", "Payment Done Successfully!", "success");
            navigate("/dashboard/enrolled-classes");
            location.state = {};
            
        };

      setProcessing(false);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button
        type="submit"
        className="btn btn-warning btn-sm mt-5"
        disabled={!stripe || !clientSecret || processing}
      >
        Pay
      </button>
    </form>
  );
};

export default Checkout;
