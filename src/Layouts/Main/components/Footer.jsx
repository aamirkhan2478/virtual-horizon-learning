import React from "react";
import logImg from "../assets/images/vhl_logo.jpg";
import { NavLink } from "react-router-dom";

export const Footer = () => {
  return (
    <>
      <footer className="bg-[#ffffff] py-10 pt-32 -mt-24 shadow-s">
        <div className="container grid grid-cols-4 gap-5 md1:grid-cols-2">
          <div className="logo">
            <img src={logImg} alt="logImg" className="h-15 w-20" />
            <span className="text-[12px] normal-case">
              Virtual Horizon Learning. Revolutionizing Education for a Digital
              Age
            </span>
          </div>

          <li>
            <h4 className="text-black text-sm font-semibold mb-5">
              Quick Links
            </h4>
            <NavLink to="/about" className=" text-[14px] block mb-2">
              About
            </NavLink>
            <NavLink to="/courses " className=" text-[14px] block mb-2">
              Courses
            </NavLink>
            <NavLink to="/instructor" className=" text-[14px] block mb-2">
              Instructor
            </NavLink>
          </li>
        </div>
      </footer>
    </>
  );
};
