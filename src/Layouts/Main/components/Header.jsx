import React, { useState } from "react";
import LogoImg from "../assets/images/vhl_logo.jpg";
import { LinkData } from "../assets/data/dummydata";
import { NavLink, useNavigate } from "react-router-dom";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { LayoutDashboard, LogIn } from "lucide-react";

export const Header = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <header className="bg-white py-4 text-black sticky z-50 shadow-md top-0 left-0 w-full">
        <div className="container flex justify-between items-center">
          <div className="logo flex items-center gap-6">
            <NavLink to="/">
              <img src={LogoImg} alt="logo" className="h-15 w-20" />
            </NavLink>
          </div>
          <nav className={open ? "mobile-view" : "desktop-view"}>
            <ul className="flex items-center gap-6">
              {LinkData.map((link) => (
                <li key={link.id} onClick={() => setOpen(null)}>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "text-primary1 text-sm" : "text-[15px]"
                    }
                    to={link.url}
                  >
                    {link.title}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <div className="account flex items-center gap-5">
            {user ? (
              <button
                className="flex gap-3"
                onClick={() => navigate("/dashboard")}
              >
                <LayoutDashboard />
                <span>Dashboard</span>
              </button>
            ) : (
              <button className="flex gap-3" onClick={() => navigate("/login")}>
                <LogIn /> <span>Login</span>
              </button>
            )}
            <button className="open-menu" onClick={() => setOpen(!open)}>
              <HiOutlineMenuAlt1 size={25} />
            </button>
          </div>
        </div>
      </header>
    </>
  );
};
