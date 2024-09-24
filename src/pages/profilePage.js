import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/navbar";
import BottomNavbar from "../components/BottomNavbar";
import Verification from "../Icons/VerificationfillIcon";

function ProfilePage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [branch, setBranch] = useState("");
  const [year, setYear] = useState("");
  const [verify, setVerify] = useState("");
  const [photo, setPhoto] = useState("");
  const [about, setAbout] = useState("");

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
        'Content-Type': 'application/json',
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
    .then((response) => response.json())
    .then((data) => {
      if(data === false) {
        navigate("/que");
      }
    })
  })


  useEffect(() => {
    fetch("https://vibes-api.onrender.com/profile", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);

        setName(data.name);
        setBranch(data.branch);

        switch (data.year) {
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
            setYear(", Fourth Year");
            break;
          default:
            // Handle default case if necessary
            break;
        }

        setAbout(data.about);
        setVerify(data.verify);
        setPhoto(data.photo);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <BottomNavbar />
      <div className=" relative mx-[12vw] lg:mx-28 mt-[12vw] lg:mt-20 border-0 border-purple-500 rounded-xl overflow-hidden">
        <img
          className="relative top-0 w-full aspect-square"
          src={photo}
          alt="helo"
        />
      </div>
      <div className="mx-[12%]">
        <h1 className="text-2xl mt-6 text-center text-purple-600">
          {name}{" "}
          {verify && (
            <span className="relative inline-flex items-center ml-1 top-1">
              <Verification />
            </span>
          )}
        </h1>
        <p className="text-lg mt-3 text-center font-r text-gray-600">
          {branch}{year}
        </p>
        <p className="text-lg mt-6 text-justify font-r text-gray-500">
         {about}
        </p>
      </div>
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}

export default ProfilePage;
