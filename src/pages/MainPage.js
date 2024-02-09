import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import DonationIcon from "../Icons/DonationIcon";

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
          className="w-[50%] mx-[25%] pt-[5%] filter invert"
          src="https://res.cloudinary.com/booktrade/image/upload/v1707461581/r8bvxrkev5bos4ozyqlf.png"
          alt="vibes logo"
        />
        <h1 className="text-4xl font-bold text-white text-center pt-8 px-[12%]">
          Find your vibe in college campus
        </h1>
        <div className="mx-[12%] mt-8 flex flex-row gap-2">
          <button
            onClick={() => navigate("/login")}
            className="w-[48%] bg-gradient-to-bl from-purple-400 to-purple-400 text-2xl font-normal tracking-wider font-r text-white py-2 rounded-lg shadow-2xl"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/signup")}
            className="w-[48%] bg-purple-100 text-2xl font-normal text-purple-600 font-r tracking-wider py-2 rounded-lg shadow-2xl"
          >
            Signup
          </button>
        </div>
        <p className="mx-[12%] mt-16 text-purple-100 text-2xl text-center">
          What we do?
        </p>
        <p className="mx-[12%] mt-4 text-purple-100 text-xl text-justify">
          While making account we will ask you some questions, based on your
          answers we will find a perfect match in your campus.
        </p>
        <div>
          {/* <div className="h-6 w-4 mt-6 ">
          <DonationIcon className="text-white"/>
        </div> */}
          <Link to="https://www.instagram.com/vibes.incampus?igsh=cGxldzZ6Zzc3NnNr">
            <div className="flex justify-center flex-grow mt-9">
              <div className="h-5 w-5 mt-[3px] mr-2">
                <DonationIcon className="text-white" />
              </div>
              <span className="text-purple-100 text-lg">vibes.incampus</span>
            </div>
          </Link>{" "}
        </div>
      </div>
    </div>
  );
}

export default MainPage;
