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
import Payment from "../pages/Dashboard/Payment/Payment";
import InstructorRoute from "./InstructorRoute";
import AddClass from "../pages/Dashboard/AddClass/AddClass"
import MyClasses from "../pages/Dashboard/MyClasses/MyClasses"
import ManageClasses from "../pages/Dashboard/ManageClasses/ManageClasses"
import ManageUsers from "../pages/Dashboard/ManageUsers/ManageUsers"
import AdminRoute from "./AdminRoute";
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";

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
          {path: "selected-classes", element: <StudentRoute><SelectedClasses/></StudentRoute>},
          {path: "enrolled-classes", element: <StudentRoute><EnrolledClasses/></StudentRoute>},
          {path: "payment", element: <StudentRoute><Payment/></StudentRoute>},
          {path: "payment-history", element: <StudentRoute><PaymentHistory/></StudentRoute>},
          {path: "add-class", element: <InstructorRoute><AddClass/></InstructorRoute>},
          {path: "my-classes", element: <InstructorRoute><MyClasses/></InstructorRoute>},
          {path: "manage-classes", element: <AdminRoute><ManageClasses/></AdminRoute>},
          {path: "manage-users", element: <AdminRoute><ManageUsers/></AdminRoute>},
        ]
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
