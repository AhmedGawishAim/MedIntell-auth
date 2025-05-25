"use client";
import React from "react";
import { toast, Bounce } from "react-toastify";
const ToastButton = () => {
    // toast func
  const handelrToastFun = () => {
    toast.success("Toastfiy Fixed done...", {
      autoClose: 1000,
      transition: Bounce,
      position: "top-right",
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return <button className="bg-orange-500 p-5 rounded-2xl" onClick={handelrToastFun}>Toastify Fix Button</button>;
};

export default ToastButton;
