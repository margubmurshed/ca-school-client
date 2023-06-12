import React, { createContext, useEffect, useState } from "react";
import { app } from "../firebase/firebase.config";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import axios from "axios";

export const authContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);
  console.log(userLoading)

  useEffect(() => {
    const subscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const response = await axios.post(
          "http://localhost:5000/jwt",
          currentUser.email
        );
        if (response.data) {
          setUserLoading(false);
          localStorage.setItem("access-token", response.data);
        }
      } else {
        setUserLoading(false);
      }
    });

    return subscribe;
  }, []);


  const createEmailPassUser = (email, pass) => {
    setUserLoading(true)
    return createUserWithEmailAndPassword(auth, email, pass);
  }
  const loginEmailPassUser = (email, pass) => {
    setUserLoading(true)
    return signInWithEmailAndPassword(auth, email, pass);
  }
  const loginGoogle = () => {
    setUserLoading(true)
    const provider = new GoogleAuthProvider()
    return signInWithPopup(auth, provider);
  }

  const logOut = () => {
    setUserLoading(true)
    return signOut(auth);
  }

  const updateUser = (name, photourl) => {
    return updateProfile(auth.currentUser, {displayName:name, photoURL:photourl})
  }

  const value = { user, userLoading, setUserLoading, createEmailPassUser, loginEmailPassUser, loginGoogle, updateUser, logOut };
  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};

export default AuthProvider;
