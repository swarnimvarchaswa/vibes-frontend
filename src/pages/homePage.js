import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import Navbar from "../components/navbar";
import BottomNavbar from "../components/BottomNavbar";
import CountdownTimer from "../components/counter";

function MainPage() {
  const navigate = useNavigate()

  // useEffect(() => {
  //   const token = localStorage.getItem("jwt");
  //   if (!token) {
  //     navigate("./login");
  //   }
  // }, []);

  return (
    <div>
      {/* <div className=" absolute top-0 bottom-0 w-dvw bg-gradient-to-b from-50% from-purple-500  to-purple-200 opacity-30"></div> */}
      <div className="absolute top-0 left-0 right-0">
        <Navbar />
        <CountdownTimer />
        <BottomNavbar />
      </div>
    </div>
  );
}

export default MainPage;
