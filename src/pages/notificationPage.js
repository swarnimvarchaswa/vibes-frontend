import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import BottomNavbar from "../components/BottomNavbar";
import CountdownTimer from "../components/counter";
import Verification from "../Icons/VerificationfillIcon";

function NotificationPage() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      navigate("./login");
    }
  }, []);

  const fetchRequests = () => {
    fetch("https://vibes-api.onrender.com/request", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setUsers(data);
      });
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const getYearText = (yearNumber) => {
    switch (yearNumber) {
      case "1":
        return ", First Year";
      case "2":
        return ", Second Year";
      case "3":
        return ", Third Year";
      case "4":
        return ", Fourth Year";
      default:
        return ""; // Handle default case if necessary
    }
  };

  const Reject = (id) => {
    try {
      fetch("https://vibes-api.onrender.com/removerequest", {
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
        .then((data) => {
          // Handle the data as needed
          fetchRequests();
        })
        .catch((err) => {
          console.error("Error updating name:", err);
        });
    } catch (error) {
      console.error("Error updating name:", error);
    }
  };

  const Accept = (id) => {
    try {
      fetch("https://vibes-api.onrender.com/friend", {
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
        .then((data) => {
          // Handle the data as needed
          Reject(id);
          // fetchRequests();
          Message(id);
        })
        .catch((err) => {
          console.error("Error updating name:", err);
        });
    } catch (error) {
      console.error("Error updating name:", error);
    }
  };

  const Message = (id) => {
    fetch("https://vibes-api.onrender.com/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({ id: id }), // Include the userId in the request body
    })
      .then((response) => response.json())
      .then((data) => {
        navigate(`/message/${data.chatId}`);
      })
      .catch((error) => {
        console.error("Error creating/retrieving chat:", error);
      });
  };

  return (
    <div>
      {/* <Navbar />
      <CountdownTimer />
      <BottomNavbar /> */}
      <div>
        <Navbar />
        <div className="mx-auto mt-12 absolute top-8 left-0 w-dvw">
          {users.map((user) => (
            <div
              key={user._id}
              className="my-4 mx-3 p-2 bg-purple-100 flex flex-cols gap-4 rounded-xl content-stretch"
            >
              <div>
                <img
                  className="w-24 mt-1 aspect-square object-cover rounded-[50%]"
                  src={user.photo}
                  alt={user.name}
                />
              </div>
              <div className="w-full">
                <h2 className="text-lg font-r text-left text-purple-600 line-clamp-1 ">
                  {user.name}{" "}
                  {user.verify && (
                    <span className="relative inline-flex items-center ml-1 top-1">
                      <Verification />
                    </span>
                  )}
                </h2>
                <p className="mt-[2px]  text-left font-m text-gray-600">
                  {user.branch}
                  {getYearText(user.year)}
                </p>
                <div className="w-full my-2">
                  <button
                    className="w-[48%] mr-[2%] py-2 bg-purple-500 hover:bg-purple-700 rounded-md font-r text-white"
                    onClick={() => Accept(user._id)}
                  >
                    Accept
                  </button>
                  <button
                    className="w-[48%] ml-[2%] py-2 bg-white border-2 border-purple-500 hover:border-purple-700 rounded-md font-r text-gray-700"
                    onClick={() => Reject(user._id)}
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <BottomNavbar />
      </div>
    </div>
  );
}

export default NotificationPage;
