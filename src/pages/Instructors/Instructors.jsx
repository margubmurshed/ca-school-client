import React from "react";
import useInstructors from "../../hooks/useInstructors";
import SingleInstructorCard from "../../Components/SingleInstructorCard/SingleInstructorCard";

const Instructors = () => {
  const [instructors, instructorsLoading] = useInstructors();
  return (
    <section className="container mx-auto p-5 my-16">
      <h2 className="text-center mb-10 text-4xl font-bold uppercase">
        Our <span className="text-ca-primary">Instructors</span>
      </h2>
      {instructorsLoading ? (
        <div className="flex justify-center items-center h-[500px]">
          <span className="loading loading-spinner loading-lg text-ca-primary"></span>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* sorted descending order based on number of students enrolled */}
          {instructors.map((instructorItem) => (
            <SingleInstructorCard
              instructorItem={instructorItem}
              key={instructorItem._id}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Instructors;
