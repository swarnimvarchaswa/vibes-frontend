import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function EditPage() {
    const navigate = useNavigate();
  const [name, setName] = useState("");
  const [nameError, setNameerror] = useState("");
  const [about, setAbout] = useState("");
  const [aboutError, setAboutError] = useState("");
  const [isNameLoading, setIsNameLoading] = useState("");
  const [isAboutLoading, setIsAboutLoading] = useState("")

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      navigate("./home");
    }
  }, []);

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
        setName(data.name);
        setAbout(data.about);
      });
  }, []);

  const PostName = (imageUrl) => {
    setIsNameLoading(true);

    try {
      fetch("https://vibes-api.onrender/editprofile", {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          name: name, // Use the imageUrl obtained from Cloudinary
        }),
      })
        .then((res) => {
          if (!res.ok) {
            setIsNameLoading(false);

            throw new Error("Update name");
          }
          return res.json();
        })
        .then((data) => {
          setIsNameLoading(false);

          // console.log("Profile picture updated successfully:", data);
          // You can add further handling or update UI as needed here
        })
        .catch((err) => {
          setIsNameLoading(false);

          console.error("Error updating name:", err);
        });
    } catch (error) {
      setIsNameLoading(false);

      console.error("Error updating name:", error);
    }
  };

  const PostAbout = (imageUrl) => {
    setIsAboutLoading(true);

    try {
      fetch("https://vibes-api.onrender.com/about", {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          about: about, // Use the imageUrl obtained from Cloudinary
        }),
      })
        .then((res) => {
          if (!res.ok) {
            setIsAboutLoading(false);

            throw new Error("Update about");
          }
          return res.json();
        })
        .then((data) => {
          setIsAboutLoading(false);

          // console.log("Profile picture updated successfully:", data);
          // You can add further handling or update UI as needed here
        })
        .catch((err) => {
          setIsAboutLoading(false);

          console.error("Error updating about:", err);
        });
    } catch (error) {
      setIsAboutLoading(false);

      console.error("Error updating about:", error);
    }
  };

  return (
    <div>
      <h1 className="mx-[12vw] mt-16  font-r text-2xl text-gray-700">
        Edit Profile
      </h1>

      <div className="mb-6 font-r tracking-wider mx-[12%] mt-16">
        <h2 className="mx-3 mt-6 mb-2  font-r text-xl text-gray-700">Name</h2>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          placeholder="Full Name"
          className="w-full px-3 py-2 rounded-md border-2 border-gray-300 focus:outline-purple-500"
        />
        {/* Name error */}
        {nameError && (
          <p className="text-red-400 px-3 mt-2 font-m tracking-wide text-sm text-left">
            {nameError}
          </p>
        )}
      </div>

      <div className="mx-[12%] mt-8 font-r tracking-wide">
        <button
          onClick={() => {
            PostName();
          }}
          disabled={isNameLoading}
          className={`${
            isNameLoading ? "bg-purple-500" : "bg-purple-600 py-2"
          } w-full  rounded-md text-white text-center overflow-hidden`}
        >
          {isNameLoading ? (
            <img
              className="h-9 mx-auto z-10"
              src="https://cdn.pixabay.com/animation/2022/07/29/03/42/03-42-22-68_512.gif"
              alt="Loading"
            /> // Replace with your loading image path
          ) : (
            <div>Update</div>
          )}
        </button>
      </div>

      <div className="mb-6 font-r tracking-wider mx-[12%] mt-16">
        <h2 className="mb-2 mx-3 mt-6  font-r text-xl text-gray-700">About</h2>
        <input
          type="text"
          id="about"
          value={about}
          onChange={(e) => {
            setAbout(e.target.value);
          }}
          placeholder="about"
          maxLength={300}
          className="w-full px-3 py-2 rounded-md border-2 border-gray-300 focus:outline-purple-500"
        />
        {/* Remaining characters count */}
        <p className="text-gray-500 text-right px-3 mt-2 font-m tracking-wide text-sm text-left">
          {about.length}/300
        </p>

        {/* Name error */}
        {aboutError && (
          <p className="text-red-400 px-3 mt-2 font-m tracking-wide text-sm text-left">
            {aboutError}
          </p>
        )}
      </div>

      <div className="mx-[12%] mt-8 font-r tracking-wide">
        <button
          onClick={() => {
              PostAbout();
          }}
          disabled={isAboutLoading}
          className={`${
            isAboutLoading ? "bg-purple-500" : "bg-purple-600 py-2"
          } w-full  rounded-md text-white text-center overflow-hidden`}
        >
          {isAboutLoading ? (
            <img
              className="h-9 mx-auto z-10"
              src="https://cdn.pixabay.com/animation/2022/07/29/03/42/03-42-22-68_512.gif"
              alt="Loading"
            /> // Replace with your loading image path
          ) : (
            <div>Update</div>
          )}
        </button>
      </div>
    </div>
  );
}

export default EditPage;
