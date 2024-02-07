import React from "react";
import Navbar from "../components/navbar";
import BottomNavbar from "../components/BottomNavbar";

function MainPage() {
  return (
    <div>
      {/* <div className=" absolute top-0 bottom-0 w-dvw bg-gradient-to-b from-50% from-purple-500  to-purple-200 opacity-30"></div> */}
      <div className="absolute top-0 left-0 right-0">
        <Navbar />
        <BottomNavbar />
        <h1>Hello Vibes</h1>
      </div>
    </div>
  );
}

export default MainPage;