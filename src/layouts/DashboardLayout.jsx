import React from "react";
import { Outlet, Link } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useInstructor from "../hooks/useInstructor";

const DashboardLayout = () => {
  const [admin, adminLoading] = useAdmin();
  const [instructor, instructorLoading] = useInstructor();

  const studentLinks = [
    { id: 1, text: "Selected Classes", path: "/dashboard/selected-classes" },
    { id: 2, text: "Enrolled Classes", path: "/dashboard/enrolled-classes" },
  ];

  const instructorLinks = [
    { id: 3, text: "Add Class", path: "/dashboard/add-class" },
    { id: 4, text: "My Classes", path: "/dashboard/classes" },
  ];

  const adminLinks = [
    { id: 5, text: "Manage Classes", path: "/dashboard/manage-classes" },
    { id: 6, text: "Manage Users", path: "/dashboard/manage-users" },
  ];

  let links = [];
  if (admin) links = adminLinks;
  else if (instructor) links = instructorLinks;
  else links = studentLinks;

  return (
    <div className="drawer lg:drawer-open z-10">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        {!adminLoading && !instructorLoading && <Outlet />}
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Open drawer
        </label>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content pt-20 lg:pt-5">
          {!adminLoading && !instructorLoading ? (
            <>
              <h2 className="text-xl font-semibold text-center mb-5">
                {admin ? "Admin" : instructor ? "Instructor" : "Student"}
                Dashboard
              </h2>
              {links.map(({ id, text, path }) => (
                <li key={id}>
                  <Link to={path}>{text}</Link>
                </li>
              ))}
            </>
          ) : (
            <div className="flex justify-center items-center h-[500px]">
              <span className="loading loading-spinner loading-lg text-ca-primary"></span>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
