import React from "react";
import { Link, useLocation } from "react-router-dom";
import SettingIcon from "../Icons/SettingIcon";

function Navbar() {
  const location = useLocation();

  return (
    // <nav className=" bg-purple-200 md:bg-purple-200 lg:px-4 lg:fixed lg:top-0 lg:left-0 lg:w-full lg:z-10">
    <nav className="relative bg-purple-200 md:bg-purple-200 max-w-xl mx-auto ">

      {/* <nav className=" bg-purple-100 md:bg-purple-200 lg:px-4 fixed top-0 left-0 w-full"> */}
      <div className="flex items-center justify-between px-4 py-4 mx-auto ">
        {/* all */}
        <div
          className={`text-gray-800 text-2xl font-r font-normal ${
            location.pathname === "/match" ||
            location.pathname === "/message" ||
            location.pathname === "/notification" ||
            location.pathname === "/menu"
              ? "hidden"
              : ""
          }`}
        >
          {" "}
          <img
            className="h-[90px] absolute top-[-12px] left-[10px]"
            src="https://res.cloudinary.com/booktrade/image/upload/v1707027727/logo_name_is0crn.png"
            alt="logo"
          />
          <div className={`text-transparent text-2xl font-r font-normal `}>
            Vibes
          </div>
        </div>
        {/* Messages */}
        <div
          className={`text-gray-800 text-2xl font-r font-normal ${
            location.pathname === "/message" ? "" : "hidden"
          }`}
        >
          Messages
        </div>
        {/* Search */}
        <div
          className={`text-gray-800 text-2xl font-r font-normal ${
            location.pathname === "/match" ? "" : "hidden"
          }`}
        >
          Match
        </div>
        {/* Notification */}
        <div
          className={`text-gray-800 text-2xl font-r font-normal ${
            location.pathname === "/notification" ? "" : "hidden"
          }`}
        >
          Notifications
        </div>
        {/* Setting */}
        <div
          className={`text-gray-800 text-2xl font-r font-normal ${
            location.pathname === "/menu" ? "" : "hidden"
          }`}
        >
          Menu
        </div>
        <div>
          <Link
            to="/menu"
            className={`flex flex-row items-center text-gray-700  lg:sr-only ${
              location.pathname === "/menu" ? "text-purple-500 " : ""
            }
          ${location.pathname === "/profile" ? " " : "hidden"}`}
          >
            <SettingIcon />
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
