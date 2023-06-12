import { Link } from "react-router-dom";
import useClasses from "../../../hooks/useClasses";
import SingleClassCard from "../../../Components/SingleClassCard/SingleClassCard";

const PopularClasses = () => {
  const [classes, classesLoading] = useClasses();
  if (classes.length > 6) classes.length = 6;
  return (
    <section className="container mx-auto p-5 mt-16">
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
      <div className="flex justify-center mt-5">
        <Link
          to="/classes"
          className="btn bg-ca-dark text-white hover:bg-ca-primary rounded-none"
        >
          View All Classes
        </Link>
      </div>
    </section>
  );
};

export default PopularClasses;
