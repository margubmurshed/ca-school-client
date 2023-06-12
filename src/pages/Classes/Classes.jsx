import React from "react";
import useClasses from "../../hooks/useClasses";
import SingleClassCard from "../../Components/SingleClassCard/SingleClassCard";

const Classes = () => {
  const [classes, classesLoading] = useClasses();
  return (
    <section className="container mx-auto p-5 my-16">
      <h2 className="text-center mb-10 text-4xl font-bold uppercase">
        Popular <span className="text-ca-primary">Classes</span>
      </h2>
      {classesLoading ? (
        <div className="flex justify-center items-center h-[500px]">
          <span className="loading loading-spinner loading-lg text-ca-primary"></span>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* sorted descending order based on number of students enrolled */}
          {classes
            .sort(
              (b, a) =>
                a.total_seats -
                a.available_seats -
                (b.total_seats - b.available_seats)
            )
            .map((classItem) => (
              <SingleClassCard classItem={classItem} key={classItem._id} />
            ))}
        </div>
      )}
    </section>
  );
};

export default Classes;
