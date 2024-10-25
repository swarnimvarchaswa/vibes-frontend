import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function WelcomePage() {
  const [name, setName] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://vibes-incampus-server.vercel.app/username", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.text())
      .then((name) => {
        setName(name);
      });
  });

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      navigate("./login");
    }
  }, []);

  return (
    <div>
      {/* <div className=" absolute top-0 bottom-0 w-dvw bg-gradient-to-b from-50% from-purple-500  to-purple-200 opacity-30"></div> */}
      <div className="absolute top-0 left-0 right-0 max-w-xl mx-auto">
        <img
          className="w-[50%] mx-[25%] mt-[10%]"
          src="https://res.cloudinary.com/booktrade/image/upload/v1706995946/logo_g8glsg.png"
          alt="vibes logo"
        />
        <h2 className="text-center text-2xl font-r tracking-normal mt-4 text-purple-500">
          Welcome {name}
        </h2>

        <h2 className="text-justify text-lg font-r tracking-wide mx-[12%] mt-12 text-gray-600">
          In order to find perfect match we will ask you some questions on that
          basis we will find you a perfect match in your college campus.
        </h2>

        <div className="mt-12 mx-[12%]">
          <button
            className=" bg-gradient-to-br from-purple-500 to-purple-900 shadow-inner shadow-purple-300 w-full text-white text-2xl py-3 rounded-xl"
            onClick={() => navigate("/que")} // Pass a function reference here
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;
