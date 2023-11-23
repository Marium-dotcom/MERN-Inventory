"use client"
import { SET_USERNAME } from "@/Redux/Slices/authSlice";
import React, { ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


const AuthInitializer = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userFromLocalStorage = localStorage.getItem("name");

      if (userFromLocalStorage) {
dispatch(SET_USERNAME(userFromLocalStorage));
      }

    }
  }, [dispatch]);

  return children;
};

export default AuthInitializer;

