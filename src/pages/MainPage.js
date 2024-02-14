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
      {/* <div className="w-dvw h-dvh bg-gradient-to-tr from-purple-500 to-purple-700">
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
          
          <Link to="https://www.instagram.com/vibes.incampus?igsh=cGxldzZ6Zzc3NnNr">
            <div className="flex justify-center flex-grow mt-9">
              <div className="h-5 w-5 mt-[3px] mr-2">
                <DonationIcon className="text-white" />
              </div>
              <span className="text-purple-100 text-lg">vibes.incampus</span>
            </div>
          </Link>{" "}
        </div>
      </div> */}

      <header className="w-dvw h-[80vh] bg-gradient-to-b from-purple-700 to-purple-300">
        <img
          // className="w-[40%] mx-[30%] pt-[10%] filter invert"
          className="w-[17%] mx-[5%] pt-[10%]"
          // src="https://res.cloudinary.com/booktrade/image/upload/v1707461581/r8bvxrkev5bos4ozyqlf.png"
          src="https://res.cloudinary.com/vibesincampus/image/upload/f_auto,q_auto/ozfczcfhuinstgwfohfy"

          alt="vibes logo"
        />
        <button
          className="absolute top-[6%] right-[5%] text-2xl font-r text-white border-2 px-10 py-2 rounded-2xl bg-purple-600 hover:bg-purple-700  shadow-2xl"
          onClick={() => navigate("/login")}
        >
          Log in
        </button>
        <h1 className="m-0 pt-16 font-r font-bold tracking-widest text-center text-white text-7xl">
          VIBES
        </h1>
        <p className="mt-10 text-center font-r text-white text-3xl">
          Beyond Dating
        </p>
        <p className="mt-1 text-center font-r text-white text-3xl">
          Building Bridges
        </p>
        <div className="mt-16 text-center">
          <button
            className="font-r text-2xl text-white px-20 py-3 bg-gradient-to-br from-purple-700 to-purple-500 hover:from-purple-900 hover:to-purple-600 rounded-2xl shadow-inner shadow-purple-300"
            onClick={() => navigate("/signup")}
          >
            Join Vibes
          </button>
        </div>
        <p className="mt-16 mx-[10%] text-center font-r text-purple-900 text-md">
          {/* Discover a platform that goes beyond dating, connecting college students on a whole new level. */}
          Join Vibes, the platform that takes college connections to a whole new
          level.
        </p>
      </header>
      <main>
        <h1 className=" text-4xl font-r mx-6 my-12 text-gray-600 tracking-wide font-bold">
          Why Vibes?
        </h1>
        <h2 className="mx-6 mt-12 font-r text-2xl tracking-wide text-purple-600">
          Breaking the Ice
        </h2>
        <p className="mx-6 mt-2 font-r text-justify text-gray-600">
          Vibes breaks the ice for those who struggle to start conversations
          with the opposite gender.
        </p>

        <h2 className="mx-6 mt-10 font-r text-2xl tracking-wide text-purple-600">
          Diverse Perspectives
        </h2>
        <p className="mx-6 mt-2 font-r text-justify text-gray-600">
          Connect with the opposite gender to gain new perspectives and broaden
          your worldview.
        </p>

        <h2 className="mx-6 mt-10 font-r text-2xl tracking-wide text-purple-600">
          Meaningful Bonds
        </h2>
        <p className="mx-6 mt-2 font-r text-justify text-gray-600">
          Vibes focuses on lasting connections, not just casual encounters.
        </p>

        <h2 className="mx-6 mt-10 font-r text-2xl tracking-wide text-purple-600">
          Respectful Communication
        </h2>
        <p className="mx-6 mt-2 font-r text-justify text-gray-600">
          Our platform encourages allowing you to express yourself authentically
          and respectfully.{" "}
        </p>

        <h2 className="mx-6 mt-10 font-r text-2xl tracking-wides text-purple-600">
          Confidence Booster
        </h2>
        <p className="mx-6 mt-2 font-r text-justify text-gray-600">
          Feel relaxed and confident while connecting with the opposite gender
          on Vibes.
        </p>
      </main>
      <div className="bg-purple-600 my-20 mx-0 px-4 text-lg">
        <h2 className="pt-10 text-4xl text-white px-6">Your Safety,</h2>
        <h2 className="pt-3 pb-10 text-4xl text-white px-6">Our Priority</h2>
        <ul className="list-disc px-6 text-purple-100">
          <li className="mt-2">
            <span className="text-white font-bold">Verified Profiles:</span> Every
            user undergoes a verification process for added authenticity.
          </li>
          <li className="mt-6">
            <span className="text-white font-bold">Moderated Interactions:</span> Our
            platform employs moderation to ensure respectful and positive
            conversations.
          </li>
          <li className="mt-6">
            <span className="text-white font-bold">Report Feature:</span> Empowering
            you to control your experience by reporting or blocking any
            inappropriate behavior.
          </li>
          <li className="mt-6">
            <span className="text-white font-bold">
              No Third-Party Intervention:
            </span>{" "}
            We strictly adhere to a no-sharing policy. Your data is yours alone.
            
          </li>
          <br />
        </ul>
      </div>
      <div>

      </div>
      <br />
      <Link to="https://www.instagram.com/vibes.incampus?igsh=cGxldzZ6Zzc3NnNr">
            <div className="flex justify-center flex-grow">
              <div className="h-5 w-5 mt-[3px] mr-2">
                <DonationIcon className="fill-purple-500" />
              </div>
              <span className="text-purple-600 text-lg">vibes.incampus</span>
            </div>
          </Link>{" "}
      <p className="text-center mt-6 mb-12 font-r text-gray-500">© 2024 Vibes. All rights reserved.</p>
      <br />
    </div>
  );
}

export default MainPage;
