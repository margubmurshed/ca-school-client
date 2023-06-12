import React from "react";
import logo from "../../assets/Images/cricketangon_cricket_school_logo.png";
import { NavLink, Link } from "react-router-dom";

const Navbar = () => {
  const user = true;
  const commonLinks = [
    { id: 1, text: "Home", path: "/" },
    { id: 2, text: "Instructors", path: "/instructors" },
    { id: 2, text: "Classes", path: "/classes" },
  ];
  const privateLinks = [{ id: 1, text: "Dashboard", path: "/dashboard" }];

  const links = user ? [...commonLinks, ...privateLinks] : commonLinks;

  const linksJSX = links.map(({ id, text, path }) => (
    <li>
      <NavLink to={path} key={id}>
        {text}
      </NavLink>
    </li>
  ));
  return (
    <header className="shadow-lg">
      <div className="navbar bg-base-100 container mx-auto">
        <div className="navbar-start">
          <div className="dropdown z-10">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              {linksJSX}
            </ul>
          </div>
          <Link to="/" className="btn btn-ghost normal-case text-xl">
            <img src={logo} alt="logo" className=" w-36" />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{linksJSX}</ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <div className="avatar">
              <div className="w-12 rounded-full">
                <img src="https://img.freepik.com/free-photo/man-wearing-t-shirt-gesturing_23-2149393645.jpg" />
              </div>
            </div>
          ) : (
            <Link to="/login" className="btn">
              login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
