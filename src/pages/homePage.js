import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import BottomNavbar from "../components/BottomNavbar";
import CountdownTimer from "../components/counter";
import Verification from "../Icons/VerificationfillIcon";

function MainPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("1");
  const [top10Users, setTop10Users] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      navigate("./login");
    }
  }, []);

  useEffect(() => {
    fetch("https://vibes-api.onrender.com/isanswers", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data === false) {
          navigate("/que");
        }
      });
  });

  const fetchTop10FemaleUsers = () => {
    fetch("https://vibes-api.onrender.com/top10users-female", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setTop10Users(data);
      });
  };

  const fetchTop10MaleUsers = () => {
    fetch("https://vibes-api.onrender.com/top10users-male", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setTop10Users(data);
      });
  };

  useEffect(() => {
    // Fetch top female users when component mounts
    if (activeTab === "1") {
      fetchTop10FemaleUsers();
    } else if (activeTab === "2") {
      fetchTop10MaleUsers();
    }
  }, [activeTab]);

  const getYearText = (yearNumber) => {
    switch (yearNumber) {
      case "1":
        return ", First Year";
      case "2":
        return ", Second Year";
      case "3":
        return ", Third Year";
      case "4":
        return ", Final Year";
      default:
        return ""; // Handle default case if necessary
    }
  };

  return (
    <div>
      {/* <div className=" absolute top-0 bottom-0 w-dvw bg-gradient-to-b from-50% from-purple-500  to-purple-200 opacity-30"></div> */}
      <div className="absolute top-0 left-0 right-0">
        <Navbar />
        {/* <CountdownTimer /> */}

        <div className="mt-8 mx-4">
          <h2 className="text-3xl mt-8 font-r text-center text-gray-700">
            Vibe of Campus
          </h2>

          {/* Tab will shown here */}
          <div className="max-w-xl mx-auto">
            <div className="  grid grid-cols-6 justify-items-stretch mt-8 border-[1px] bg-white border-gray-300 rounded-md text-center">
              <div className="col-start-1 col-end-4">
                <div
                  className={` py-2 px-4 rounded-md font-r text-lg tracking-wider ${
                    // props.activeTab === 1
                    activeTab === "1"
                      ? "bg-purple-600 text-white"
                      : "bg-white text-[#545454]"
                  }`}
                  // onClick={() => OnTabChange(1)}
                  onClick={() => setActiveTab("1")}
                >
                  {/* {props.firstButton} */}
                  Girls
                </div>
              </div>
              <div className="col-start-4 col-end-7">
                <div
                  className={` py-2 px-4 rounded-md font-r text-lg tracking-wider ${
                    // props.activeTab === 2
                    activeTab === "2"
                      ? "bg-purple-600 text-white"
                      : "bg-white text-[#545454]"
                  }`}
                  // onClick={() => props.onTabChange(2)}
                  onClick={() => setActiveTab("2")}
                >
                  {/* {props.secondButton} */}
                  Boys
                </div>
              </div>
            </div>
          </div>

          { top10Users.length > 1 && (
            <>
              <div className="bg-purple-100 py-6 mt-8 rounded-3xl max-w-xl mx-auto">
                <div className="border-4 border-purple-500 w-fit aspect-square rounded-[50%] mx-auto">
                  <img
                    className="w-36 h-36 rounded-[50%]"
                    src={top10Users[0].photo}
                    alt=""
                  />
                </div>

                <div className="mx-[12%]">
                  <h1 className="text-2xl mt-5 text-center text-purple-600">
                    {top10Users[0].name}
                    {top10Users[0].verify && (
                      <span className="relative inline-flex items-center ml-1 top-1">
                        <Verification />
                      </span>
                    )}
                  </h1>
                  <p className="text-lg mt-1 text-center font-r text-gray-600">
                    {top10Users[0].branch} {getYearText(top10Users[0].year)}
                  </p>
                </div>
              </div>

              <div className="mt-10 bg-purple-100 rounded-3xl p-6 max-w-xl mx-auto">
                {top10Users.slice(1).map((user) => (
                  <div key={user._id}>
                    <div className="flex flex-cols gap-6 px-2">
                      <div>
                        <img
                          className="w-20 mt-1 aspect-square object-cover rounded-[50%]"
                          src={user.photo}
                          alt=""
                        />
                      </div>

                      <div className="w-full">
                        <h2 className="text-lg font-r text-left text-purple-600 line-clamp-1 ">
                          {user.name}{" "}
                          {user.verify && (
                            <span className="relative inline-flex items-center ml-1 top-1 z-0">
                              <Verification />
                            </span>
                          )}
                        </h2>
                        <p className="mt-[2px]  text-left font-m text-gray-600">
                          {user.branch}
                          {getYearText(user.year)}
                        </p>
                      </div>
                    </div>
                    <hr className="my-4 border-solid border-2 border-white rounded-md" />
                  </div>
                ))}
                <p className="text-sm text-center font-r text-gray-400">
                  Only verify accounts will feature here
                </p>
              </div>
            </>
          )}
        </div>
        <br />
        <br />
        <br />
        <br />
      </div>
      <BottomNavbar />
    </div>
  );
}

export default MainPage;
