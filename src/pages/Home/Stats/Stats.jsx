import React from "react";

const Stats = () => {
  return (
    <section className="container mx-auto p-5 mt-16">
      <div className="relative w-full h-full">
        <div className="relative z-10 stats bg-transparent stats-vertical lg:stats-horizontal shadow w-full rounded-none gap-3">
          <div className="stat place-items-center bg-ca-primary p-10 text-white">
            <div className="stat-title text-white">Users</div>
            <div className="stat-value">31K</div>
          </div>
          <div className="stat place-items-center bg-ca-primary p-10 text-white">
            <div className="stat-title text-white">Instructors</div>
            <div className="stat-value text-white">4,200</div>
          </div>

          <div className="stat place-items-center bg-ca-primary p-10 text-white">
            <div className="stat-title text-white">Learners</div>
            <div className="stat-value">1,200</div>
          </div>
          <div className="stat place-items-center bg-ca-primary p-10 text-white">
            <div className="stat-title text-white">Enrollments</div>
            <div className="stat-value">1,200</div>
          </div>
          <div className="stat place-items-center bg-ca-primary p-10 text-white">
            <div className="stat-title text-white">Classes</div>
            <div className="stat-value">1,200</div>
          </div>
        </div>
        <div className="absolute top-0 z-0 w-full h-full flex justify-center items-center">
            <div className="w-10/12 h-3/4 bg-ca-primary bg-opacity-50"></div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
