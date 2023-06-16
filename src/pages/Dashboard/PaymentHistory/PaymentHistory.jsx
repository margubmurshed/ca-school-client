import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const PaymentHistory = () => {
  const axiosSecure = useAxiosSecure();
  const auth = useAuth();
  const { data: histories = [], isLoading: historiesLoading } = useQuery({
    queryKey: ["payment-history"],
    queryFn: async () => {
      const result = await axiosSecure.get(`/enrollments`, {
        headers: {
          email: auth.user.email,
          Authorization: localStorage.getItem("access-token"),
        },
      });
      if(result.data.length){
        result.data.sort((a,b) => new Date(b.date).getTime() - new Date(a.date))
      }
      return result.data;
    },
  });

  if (historiesLoading) {
    return (
      <div className="flex justify-center items-center h-[500px]">
        <span className="loading loading-spinner loading-lg text-ca-primary"></span>
      </div>
    );
  }

  return (
    <section className="p-5 w-full h-full">
      <h2 className="text-center mb-10 text-4xl font-bold uppercase">
        Payment <span className="text-ca-primary">History</span>
      </h2>
      {histories.length ? (
        <div className="overflow-x-auto">
          <table className="table table-xs">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Transaction ID</th>
                <th>Image</th>
                <th>Name</th>
                <th>Instructor</th>
                <th>Amount</th>
                <th>Time</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {histories.map((item, index) => (
                <tr key={item._id}>
                  <th>{index + 1}</th>
                  <th>{item.transactionId}</th>
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
                  <td>${item.price}</td>
                  <td>{new Date(item.date).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="font-thin h-[400px] flex items-center justify-center">
          You have no paymnet history
        </p>
      )}
    </section>
  );
};

export default PaymentHistory;
