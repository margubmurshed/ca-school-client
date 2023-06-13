import { Navigate, createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Instructors from "../pages/Instructors/Instructors";
import Classes from "../pages/Classes/Classes";
import Signup from "../pages/Signup/Signup";
import Login from "../pages/Login/Login";
import NotFound from "../pages/NotFound/NotFound";
import PrivateRoute from "../routes/PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import SelectedClasses from "../pages/Dashboard/SelectedClasses/SelectedClasses"
import EnrolledClasses from "../pages/Dashboard/EnrolledClasses/EnrolledClasses"
import StudentRoute from "./StudentRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "instructors", element: <Instructors /> },
      { path: "classes", element: <Classes /> },
      { path: "signup", element: <Signup /> },
      { path: "login", element: <Login /> },
      {
        path: "dashboard",
        element: (
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        ),
        children: [
          {path: "/dashboard/selected-classes", element: <StudentRoute><SelectedClasses/></StudentRoute>},
          {path: "/dashboard/enrolled-classes", element: <StudentRoute><EnrolledClasses/></StudentRoute>},
        ]
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
