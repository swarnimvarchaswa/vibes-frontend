import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/navbar";
import BottomNavbar from "../components/BottomNavbar";
import CountdownTimer from "../components/counter";
import Verification from "../Icons/VerificationfillIcon";

function MatchPage() {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [branch, setBranch] = useState("");
  const [year, setYear] = useState("");
  const [photo, setPhoto] = useState("");
  const [verify, setVerify] = useState("");
  const [about, setAbout] = useState("");
  const [dailyConnectionRequests, setDailyConnectionRequests] = useState("");

  const [top5, setTop5] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [skipLoading, setSkipLoading] = useState(false);
  const [connectLoading, setConnectLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      navigate("./login");
    }
  }, []);

  useEffect(() => {
    fetch("https://vibes-incampus-server.vercel.app/isanswers", {
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

  const Match = () => {
    setSkipLoading(true);
    
    fetch("https://vibes-incampus-server.vercel.app/match", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setId(data.userDetails._id);
        setName(data.userDetails.name);
        setPhoto(data.userDetails.photo);
        setBranch(data.userDetails.branch);
        setTop5(data.isInTop5Percent);

        switch (data.userDetails.year) {
          case "1":
            setYear(", First Year");
            break;
          case "2":
            setYear(", Second Year");
            break;
          case "3":
            setYear(", Third Year");
            break;
          case "4":
            setYear(", Final Year");
            break;
          default:
            break;
        }
        setAbout(data.userDetails.about);
        setVerify(data.userDetails.verify);
        setIsLoading(false);
        setSkipLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching match:", error);
        setIsLoading(false);
        setSkipLoading(false);
      });
  };

  const Connect = () => {
    setConnectLoading(true);
    
    try {
      fetch("https://vibes-incampus-server.vercel.app/request", {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          id: id,
        }),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Update name failed");
          }
          return res.json();
        })
        .then(() => {
          IncreaseLimit();
          Match();
          setConnectLoading(false);
        })
        .catch((err) => {
          console.error("Error updating name:", err);
          setConnectLoading(false);
        });
    } catch (error) {
      console.error("Error updating name:", error);
      setConnectLoading(false);
    }
  };

  const Limit = () => {
    fetch("https://vibes-incampus-server.vercel.app/connectionlimit", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setDailyConnectionRequests(data.dailyConnectionRequests);
      });
  };

  const IncreaseLimit = () => {
    try {
      fetch("https://vibes-incampus-server.vercel.app/limit", {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Update name failed");
          }
           Limit()
          return res.json();
         
        })
        .catch((err) => {
          console.error("Error updating name:", err);
        });
    } catch (error) {
      console.error("Error updating name:", error);
    }
  };

  useEffect(() => {
    Match();
    Limit();
  }, []);

  const nextButtonClick = () => {
    if (!skipLoading) {
      Match();
    }
  };

  const connectButtonClick = () => {
    if (dailyConnectionRequests < 2 && !connectLoading) {
      Connect();
    }
  };

  return (
    <div>
      <Navbar />
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <img
            className="w-24 h-24"
            src="https://res.cloudinary.com/booktrade/image/upload/v1695586780/Circle_Loader_nkgtip.gif"
            alt="Loading"
          />
        </div>
      ) : (
        <>
          <div className="absolute top-16 bottom-48 overflow-hidden max-w-xl mx-auto">
            <div className="relative mx-16 lg:mx-32 mt-16 border-0 border-purple-500 rounded-xl overflow-hidden">
              <img
                className="relative top-0 w-full aspect-square"
                src={photo}
                alt="profile"
              />
            </div>
            <div className="mx-[12%]">
              <h1 className="text-2xl mt-6 mb-0 text-center text-purple-600">
                {name}{" "}
                {verify && (
                  <span className="relative inline-flex items-center ml-1 top-1">
                    <Verification />
                  </span>
                )}
              </h1>
              <p className="text-lg mt-1 text-center font-r text-gray-600">
                {branch}
                {year}
              </p>
              {top5 && (
                <p className="w-full text-center text-lg text-green-500">
                  Recommended
                </p>
              )}
              <p className="text-lg mt-3 text-justify font-r text-gray-500 line-clamp-3">
                {about}
              </p>
            </div>
          </div>
          <div className="flex flex-row px-12 lg:px-28 absolute w-full bottom-28 max-w-xl mx-auto">
            <button
              className={`bg-purple-100 mr-[2%] w-[48%] text-gray-700 text-lg font-r py-3 rounded-xl border-2 border-purple-600 shadow-2xl shadow-purple-200 ${
                skipLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
              onClick={nextButtonClick}
              disabled={skipLoading}
            >
              {skipLoading ? (
                <div className="flex justify-center items-center">
                  <img
                    className="h-6 w-6"
                    src="https://res.cloudinary.com/booktrade/image/upload/v1695586780/Circle_Loader_nkgtip.gif"
                    alt="Loading"
                  />
                </div>
              ) : (
                "Skip"
              )}
            </button>
            <button
              className={`bg-gradient-to-bl from-purple-500 to-purple-800 ml-[2%] w-[48%] text-white text-lg font-r py-3 rounded-xl shadow-2xl shadow-purple-200 ${
                connectLoading || dailyConnectionRequests >= 2
                  ? "opacity-70 cursor-not-allowed"
                  : ""
              }`}
              onClick={connectButtonClick}
              disabled={connectLoading || dailyConnectionRequests >= 2}
            >
              {connectLoading ? (
                <div className="flex justify-center items-center">
                  <img
                    className="h-6 w-6"
                    src="https://res.cloudinary.com/booktrade/image/upload/v1695586780/Circle_Loader_nkgtip.gif"
                    alt="Loading"
                  />
                </div>
              ) : (
                "Connect"
              )}
            </button>
          </div>
          <div className="absolute left-0 bottom-16 w-full text-sm">
            <h1
              className={`text-lg font-r text-center ${
                dailyConnectionRequests === 2 ? "text-red-600" : "text-purple-600"
              }`}
            >
              {dailyConnectionRequests}/2
            </h1>
          </div>
        </>
      )}
      <BottomNavbar />
    </div>
  );
}

export default MatchPage;
