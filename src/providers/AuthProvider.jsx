import React, { createContext, useEffect, useState } from "react";
import { app } from "../firebase/firebase.config";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import axios from "axios";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";

export const authContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(false);
  const [instructor, setInstructor] = useState(false);
  const [userLoading, setUserLoading] = useState(true);
  const [adminLoading, setAdminLoading] = useState(true);
  const [instructorLoading, setInstructorLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const subscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          const JWTResponse = await axios.post(
            "https://ca-school-server-production.up.railway.app/jwt",
            currentUser.email
          );
          if (JWTResponse.data) {
            setUserLoading(false);
            localStorage.setItem("access-token", JWTResponse.data);
          }

          // save user
          const user = {
            name: currentUser?.displayName || "Anonoymous",
            email: currentUser?.email,
            role: "student",
          };
          await axiosSecure.post("https://ca-school-server-production.up.railway.app/users", user);

          // set admin and instructor
          const adminResponse = await axiosSecure.get("/verifyAdmin", {
            headers: {
              email: currentUser.email,
            },
          });
          setAdmin(adminResponse.data.admin);
          setAdminLoading(false);
          const instructorResponse = await axiosSecure.get(
            "/verifyInstructor",
            {
              headers: {
                email: currentUser.email,
              },
            }
          );
          setInstructor(instructorResponse.data.instructor);
          setInstructorLoading(false);
        } catch (err) {
          setUserLoading(false);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: err.message,
          });
        }
      } else {
        setUserLoading(false);
      }
    });

    return subscribe;
  }, []);

  const createEmailPassUser = (email, pass) => {
    setUserLoading(true);
    return createUserWithEmailAndPassword(auth, email, pass);
  };
  const loginEmailPassUser = (email, pass) => {
    setUserLoading(true);
    return signInWithEmailAndPassword(auth, email, pass);
  };
  const loginGoogle = () => {
    setUserLoading(true);
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const logOut = () => {
    setUserLoading(true);
    return signOut(auth);
  };

  const updateUser = (name, photourl) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photourl,
    });
  };

  const value = {
    user,
    userLoading,
    setUserLoading,
    createEmailPassUser,
    loginEmailPassUser,
    loginGoogle,
    updateUser,
    logOut,
    admin,
    adminLoading,
    instructor,
    instructorLoading
  };
  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};

export default AuthProvider;
