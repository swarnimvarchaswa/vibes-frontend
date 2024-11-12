import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [isLoading, setIsLoading] = useState();

  const postData = () => {
    setIsLoading(true);

    fetch("https://vibes-incampus-server.vercel.app/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error === "newUser") {
          navigate("/signup", { state: { email: email } });
        } else {
          // console.log("jwt", data)
          localStorage.setItem("jwt", data);
          setIsLoading(false);
          navigate("/home");
        }
      })
      .catch((error) => {
        console.error("Error during login:", error);
      });
  };

  const postDataGuest = () => {
    setIsLoading(true);

    fetch("https://vibes-incampus-server.vercel.app/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "swaryanswaryan@gmail.com",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error === "newUser") {
          navigate("/signup", { state: { email: email } });
        } else {
          // console.log("jwt", data)
          localStorage.setItem("jwt", data);
          setIsLoading(false);
          navigate("/home");
        }
      })
      .catch((error) => {
        console.error("Error during login:", error);
      });
  };

  useEffect(() => {
    // This useEffect will be triggered when email state changes
    if (email) {
      postData();
    }
  }, [email]); // Include email in dependency array

  return (
    <div>
      {/* logo img */}
      <img
        className="w-[50%] mx-[25%] mt-[10%]"
        src="https://res.cloudinary.com/booktrade/image/upload/v1706995946/logo_g8glsg.png"
        alt="vibes logo"
      />

      {isLoading ? (
        <img
          className="max-w-md w-full mx-auto"
          src="https://res.cloudinary.com/booktrade/image/upload/v1695586780/Circle_Loader_nkgtip.gif"
          alt="Loading"
        />
      ) : (
        <div>
          <h2 className="text-center mx-auto mb-8 text-2xl font-r tracking-wider my-6 text-gray-800 w-full">
            Login with Google
          </h2>
          {/* <div className="mx-[12%] border-2 rounded-md border-purple-500">
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                // console.log(credentialResponse);
                var cred = jwtDecode(credentialResponse.credential);
                // console.log(cred.email)
                setEmail(cred.email);
                // console.log(email);
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </div>

          <br />
          <br />

          <button className="mx-[12%] border-2 rounded-md border-purple-500 w-full max-w-md h-10 text-purple-600 hover:bg-purple-600 hover:text-white"
          onClick={() => {
            postDataGuest();
          }}
          >
            Log In as Guest
          </button> */}

          <div className="mx-[12%] space-y-6">
            {/* Google Login Button */}
            <div className="flex justify-center">
              <GoogleLogin
                // clientId="242140237343-k1o5gso88vehl5rkq26cm8d5eumpddr3.apps.googleusercontent.com"
                onSuccess={(credentialResponse) => {
                  var cred = jwtDecode(credentialResponse.credential);
                  setEmail(cred.email);
                }}
                onError={() => {
                  console.log("Login Failed");
                }}
              />
            </div>

            {/* Divider */}
            <div className="flex items-center justify-center">
              <div className="border-t border-gray-300 w-1/3"></div>
              <span className="text-gray-500 px-3">OR</span>
              <div className="border-t border-gray-300 w-1/3"></div>
            </div>

            {/* Guest Login Button */}
            <button
              className="w-full max-w-md mx-auto border-2 rounded-md border-purple-500 h-12 text-purple-600 hover:bg-purple-600 hover:text-white transition-all duration-300 ease-in-out"
              onClick={() => {
                postDataGuest();
              }}
            >
              Log In as Guest
            </button>
          </div>

          <div className="mt-10">
            <p className="text-center text-gray-600 font-r tracking-wide">
              Don't have an account?{" "}
              <Link to="/signup" className="text-purple-600 hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
