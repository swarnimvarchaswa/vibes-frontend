import React, { useState, useEffect } from "react";

import { Link, useLocation } from "react-router-dom";

import HomeIcon from "../Icons/HomeIcon";
import MessageIcon from "../Icons/MessageIcon";
import SearchIcon from "../Icons/SearchIcon";
import NotificationIcon from "../Icons/NotificationIcon";
import ProfileIcon from "../Icons/ProfileIcon";

function BottomNavbar() {
  const location = useLocation();
  const [notification, setNotification] = useState("");

  useEffect(() => {
    fetch("https://vibes-incampus-server.vercel.app/isnotification", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data.isNotification)
        setNotification(data.isNotification);
      });
  }, []);

  // const handleNotificationClick = () => {
  //   try {
  //     fetch("http://localhost:5000/isnotification", {
  //       method: "put",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: "Bearer " + localStorage.getItem("jwt"),
  //       },
  //     })
  //       .then((res) => {
  //         if (!res.ok) {
  //           throw new Error("Update name failed");
  //         }
  //         console.log("working")
  //         return res.json();
          
  //       })
  //       .catch((err) => {
  //         console.error("Error updating name:", err);
  //       });
  //   } catch (error) {
  //     console.error("Error updating name:", error);
  //   }
  // };

  return (
    <div>
      {/* <nav className="fixed bottom-0 left-0  w-full bg-white py-4 border-t-[1px] z-80"> */}
      <nav className="fixed bottom-0 w-full  max-w-xl mx-auto bg-white py-4 border-t-[1px] z-80">
        <div className="flex justify-around">
          <Link
            to="/home"
            exact="true"
            className={`flex flex-col item-center text-gray-700 ${
              location.pathname === "/home" ? "text-purple-500" : "fill-none" //fill-purple-400
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
            {notification ? (
              <hr className="border-solid border-[3px] rounded-full z-50 border-purple-600 w-0 relative bottom-[-2px]" />
            ) : (
              <hr className="border-solid border-[3px] rounded-full z-50 opacity-0 w-0 relative bottom-[-2px]" />
            )}
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
