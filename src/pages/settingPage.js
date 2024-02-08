import React, { useEffect } from "react";
import Navbar from "../components/navbar";
import BottomNavbar from "../components/BottomNavbar";

import { googleLogout } from "@react-oauth/google";

import { Link, useNavigate } from "react-router-dom";
import KeyIcon from "../Icons/KeyIcon";
import EditIcon from "../Icons/SettingEditIcon";
import VerificationIcon from "../Icons/VerificationIcon";
import MessageIcon from "../Icons/MessageIcon";
import QuestionIcon from "../Icons/QuestionIcon";
import LogoutIcon from "../Icons/LogoutIcon";
// import { LoginContext } from "../context/loginContext";

function Setting() {

  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      navigate("./login");
    }
  }, []);

  const handleLogout = () => {
    // Call your logout function here
    googleLogout();
    localStorage.clear();
    // Additional logout logic if needed
    navigate("/login")
  };

  //   const {setModalOpen} = useContext(LoginContext)
  return (
    <div>
      <Navbar />
      <BottomNavbar />
      <div className="container max-w-md mx-auto my-4">
        <div className="flex flex-cols ">
          <div>
            <p className="text-left font-r text-2xl my-4 tracking-wide text-gray-700 px-4">
              Manage your Account
            </p>
            <Link
              to="/uploadphoto"
              className="flex flex-row gap-4 px-8 py-4  font-r tracking-wide hover:text-purple-500 "
            >
              <KeyIcon />
              <p>Edit Profile Picture</p>
            </Link>
            <hr className="w-screen max-w-md " />
            <Link
              to="/editprofile"
              className="flex flex-row gap-4 px-8 py-4  font-r tracking-wide hover:text-purple-500 "
            >
              <EditIcon />
              <p>Edit Profile</p>
            </Link>
            <hr className="w-screen max-w-md " />
            <Link
              to="/Verification"
              className="flex flex-row gap-4 px-8 py-4  font-r tracking-wide text-gray-700 hover:text-purple-500"
            >
              <VerificationIcon />
              <p>Verify for free</p>
            </Link>{" "}
            <hr className="w-screen max-w-md " />
            <Link
              to="/contact"
              className="flex flex-row gap-4 px-8 py-4  font-r tracking-wide text-gray-700 hover:text-purple-500"
            >
              <MessageIcon />
              <p>Contact Us</p>
            </Link>{" "}
            <hr className="w-screen max-w-md " />
            <Link
              to="/faq"
              className="flex flex-row gap-4 px-8 py-4  font-r tracking-wide text-gray-700 hover:text-purple-500"
            >
              <QuestionIcon />
              <p>FAQ</p>
            </Link>{" "}
            <hr className="w-screen max-w-md " />
            <Link
              to=""
              className="flex flex-row gap-4 px-8 py-4  font-r tracking-wide text-red-500 hover:text-red-600"
              // onClick = {() => setModalOpen(true)}
              onClick={handleLogout}
            >
              <LogoutIcon />
              <p>Log Out from Account</p>
            </Link>
            <hr className="w-screen max-w-md " />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Setting;
