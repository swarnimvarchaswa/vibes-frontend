import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";


function Login() {
  return (
    <div>
      {/* logo img */}
      <img
        className="w-[50%] mx-[25%] mt-[10%]"
        src="https://res.cloudinary.com/booktrade/image/upload/v1706995946/logo_g8glsg.png"
        alt="vibes logo"
      />
      
    </div>
  );
}

export default Login;
