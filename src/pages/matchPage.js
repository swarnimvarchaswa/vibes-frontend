import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/navbar";
import BottomNavbar from "../components/BottomNavbar";
import CountdownTimer from "../components/counter";

function MatchPage() {
  const navigate = useNavigate();

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
  
  return (
    <div>
      <Navbar />
      <CountdownTimer />
      <BottomNavbar />
    </div>
  );
}

export default MatchPage;
