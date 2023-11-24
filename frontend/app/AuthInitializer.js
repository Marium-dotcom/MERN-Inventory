"use client"
import { SET_LOGIN, SET_USERNAME } from "@/Redux/Slices/authSlice";
import React, { ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


const AuthInitializer = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userFromLocalStorage = localStorage.getItem("name");
      const loggedStatus =  localStorage.getItem("isLoggedIn")


      if (userFromLocalStorage) {
dispatch(SET_USERNAME(userFromLocalStorage));
      }
if(loggedStatus){     
   dispatch(SET_LOGIN(loggedStatus))
}

    }
  }, [dispatch]);

  return children;
};

export default AuthInitializer;

