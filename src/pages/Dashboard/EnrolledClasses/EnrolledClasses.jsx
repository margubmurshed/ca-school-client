import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';

const EnrolledClasses = () => {
    const axiosSecure = useAxiosSecure();
    const auth = useAuth();
    const {data:enrollments = [], isLoading:enrollmentsLoading} = useQuery({
        queryKey: ['enrollments'],
        queryFn: async() => {
            const result = await axiosSecure.get("/enrollments", {
                headers:{
                    email: auth.user.email,
                    Authorization: localStorage.getItem("access-token")
                }
            });
            return result.data;
        }
    })

    if(enrollmentsLoading) return (
        <div className="flex justify-center items-center h-[500px]">
          <span className="loading loading-spinner loading-lg text-ca-primary"></span>
        </div>
      );

    return (
        <section className="p-5 w-full h-full">
      <h2 className="text-center mb-10 text-4xl font-bold uppercase">
        Enrolled <span className="text-ca-primary">Classes</span>
      </h2>
      <div className="space-y-5 md:w-3/4 mx-auto">
        {enrollments.length ? enrollments.map((item) => (
          <div
            className="card lg:card-side bg-base-100 shadow-xl"
            key={item._id}
          >
            <figure className="lg:w-1/3 h-[200px]">
              <img
                src={item.image}
                alt="Album"
                className="h-full w-full object-cover"
              />
            </figure>
            <div className="card-body lg:w-2/3">
              <h2 className="card-title">{item.name}</h2>
              <p>
                <b>Instructor : </b>
                {item.instructor}
              </p>
              <p>
                <b className="text-ca-primary">Price : </b>${item.price}
              </p>
              <div className="card-actions justify-end">
                <span
                  className="badge badge-success"
                >
                  Transaction ID : {item.transactionId}
                </span>
              </div>
            </div>
          </div>
        )) : <p className='font-thin h-[400px] flex items-center justify-center'>No Enrollments Done Yet</p>}
      </div>
    </section>
    );
};

export default EnrolledClasses;