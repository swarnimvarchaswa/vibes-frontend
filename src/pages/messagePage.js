import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/navbar";
import BottomNavbar from "../components/BottomNavbar";
import CountdownTimer from "../components/counter";

function MessagePage() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("jwt");
        if (!token) {
          navigate("./login");
        }
      }, []);

    return(
        <div>
            <Navbar />
            <CountdownTimer />
            <BottomNavbar />
        </div>
    )
}

export default MessagePage;

