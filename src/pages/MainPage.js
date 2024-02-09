import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function MainPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      navigate("./home");
    }
  }, []);

  return (
    <div>
      <div className="w-dvw h-dvh bg-gradient-to-tr from-purple-500 to-purple-700">
        <img
          className="w-[50%] mx-[25%] pt-[10%] filter invert"
          src="https://res.cloudinary.com/booktrade/image/upload/v1707461581/r8bvxrkev5bos4ozyqlf.png"
          alt="vibes logo"
        />
        <h1 className="text-4xl font-bold text-white text-center pt-12 px-[12%]">
          Find your vibe in college campus
        </h1>
        <div className="mx-[12%] mt-10 flex flex-row gap-2">
          <button
            onClick={() => navigate("/login")}
            className="w-[48%] bg-gradient-to-bl from-purple-400 to-purple-400 text-2xl font-bold text-white py-2 rounded-lg shadow-2xl"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/signup")}
            className="w-[48%] bg-purple-100 text-2xl font-bold text-purple-600 py-2 rounded-lg shadow-2xl"
          >
            Signup
          </button>
        </div>
        <p className="mx-[12%] mt-16 text-purple-100 text-2xl text-center">
            What we do?
        </p>
        <p className="mx-[12%] mt-4 text-purple-100 text-xl text-justify">
            While making account we will ask you some questions, based on your answers we will find a perfect match in your campus.
        </p>
      </div>
    </div>
  );
}

export default MainPage;
