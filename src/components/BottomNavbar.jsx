import React from "react";

import { Link, useLocation } from "react-router-dom";

import HomeIcon from "../Icons/HomeIcon";
import MessageIcon from "../Icons/MessageIcon";
import SearchIcon from "../Icons/SearchIcon";
import NotificationIcon from "../Icons/NotificationIcon";
import ProfileIcon from "../Icons/ProfileIcon";

function BottomNavbar() {
  const location = useLocation();

  return (
    <div>
      <nav className="fixed bottom-0 left-0 w-full bg-white py-4 border-t-[1px]">
        <div className="flex justify-around">
          <Link
            to="/"
            exact="true"
            className={`flex flex-col item-center text-gray-700 ${
              location.pathname === "/" ? "text-purple-500" : "fill-none" //fill-purple-400
            }`}
          >
            <HomeIcon />
          </Link>

          <Link
            to="/message"
            className={`flex flex-col pb-1 items-center text-gray-700 ${
              location.pathname === "/message" ? "text-purple-500" : ""
            }`}
            // onClick={() => setIsNewMessage(false)}
          >
            <MessageIcon />
            {/* {isNewMessage ? (
              <hr className="border-solid border-[3px] rounded-full z-50 border-purple-600 w-0 relative bottom-[-2px] " />
            ) : (
              <hr className="border-solid border-[3px] rounded-full z-50 opacity-0 border-purple-600 w-0 relative bottom-[-2px] " />
            )} */}
          </Link>
          <Link
            to="/match"
            className={`flex flex-col items-center text-gray-700 ${
              location.pathname === "/match" ? "text-purple-500 " : ""
            }`}
          >
            <SearchIcon />
          </Link>

          <Link
            to="/notification"
            className={`flex flex-col pb-1 items-center text-gray-700 ${
              location.pathname === "/notification" ? "text-purple-500 " : ""
            }`}
            // onClick={handleNotificationClick}
          >
            <NotificationIcon />
            {/* {showNotificationHR ? (
              <hr className="border-solid border-[3px] rounded-full z-50 border-purple-600 w-0 relative bottom-[-2px]" />
            ) : (
              <hr className="border-solid border-[3px] rounded-full z-50 opacity-0 w-0 relative bottom-[-2px]" />
            )} */}
          </Link>

          <Link
            to="/profile"
            className={`flex flex-col items-center text-gray-700 ${
              location.pathname === "/profile" ? "text-purple-500 " : ""
            }`}
          >
            <ProfileIcon />
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default BottomNavbar;
