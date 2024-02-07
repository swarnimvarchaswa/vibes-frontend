import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

function SignupPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [gender, setGender] = useState("");
  const [genderError, setGenderError] = useState("");
  const [college, setCollege] = useState("");
  const [collegeError, setCollegeError] = useState("");
  const [branch, setBranch] = useState("");
  const [branchError, setBranchError] = useState("");
  const [year, setYear] = useState("");
  const [yearError, setYearerror] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [startLoading, setStartLoading] = useState(false);

  // redirect from login page
  useEffect(() => {
    const stateEmail = location.state?.email;
    if (stateEmail) {
      setEmail(stateEmail);
    }
  }, [location.state]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setStartLoading(true);

        const response = await fetch("http://localhost:5000/login", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          // Email is already registered, navigate to login page
          // console.log("jwt", data);
          localStorage.setItem("jwt", data);
          navigate("/");
        } else {
          // Email is new, continue with the signup process
          // console.log("new email");
        }
      } catch (error) {
        console.error("Error during email check:", error);
      } finally {
        setStartLoading(false); // Set startLoading to false after the fetch operation completes
      }
    };

    if (email) {
      fetchData();
    }
  }, [email, navigate]);

  const postData = () => {
    setNameError("");
    setGenderError("");
    setCollegeError("");
    setBranchError("");
    setYearerror("");

    setIsLoading(true);

    fetch("http://localhost:5000/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        gender: gender,
        college: college,
        branch: branch,
        year: year,
        email: email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          if (data.error === "nameError") {
            setNameError("Enter your name");
            setIsLoading(false);
          } else if (data.error === "genderError") {
            setGenderError("Select your Gender");
            setIsLoading(false);
          } else if (data.error === "collegeError") {
            setCollegeError("select your college");
            setIsLoading(false);
          } else if (data.error === "branchError") {
            setBranchError("Select your Course or Branch");
            setIsLoading(false);
          } else if (data.error === "yearError") {
            setYearerror("select your Year");
            setIsLoading(false);
          }
        } else {
          setIsLoading(false);
          // Signup successful, you can navigate to the next page or perform any other action
          // console.log("Signup successful");
          localStorage.setItem("jwt", data);
          navigate("/welcome");
        }
      });
  };

  return (
    <div>
      {/* <div className=" absolute top-0 bottom-0 w-dvw bg-gradient-to-b from-50% from-purple-500  to-purple-200 opacity-30"></div> */}

      <div className="absolute top-0 bottom-0 left-0 right-0 bg-purple-50">
        {/* logo img */}
        <img
          className="w-[50%] mx-[25%] mt-[10%]"
          src="https://res.cloudinary.com/booktrade/image/upload/v1706995946/logo_g8glsg.png"
          alt="vibes logo"
        />

        {!email && (
          <div>
            <h2 className="text-center mx-[12%] mb-8 text-2xl font-r tracking-wider my-6 text-gray-800">
              Signup with Google
            </h2>
            <div className="mx-[12%] border-2 rounded-md border-purple-500">
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

            <div className="mt-10 font-r tracking-wide">
        <p className="text-center text-gray-600">
          Back to{" "}
          <Link to="/login" className="text-purple-600 hover:underline">
            Log in
          </Link>
        </p>
      </div>
          </div>
        )}

        {startLoading ? (
          <img
            className="max-w-md w-full mx-auto"
            src="https://res.cloudinary.com/booktrade/image/upload/v1695586780/Circle_Loader_nkgtip.gif"
            alt="Loading"
          />
        ) : (
          <div>
            {email && (
              <div>
                <h2 className="text-center text-3xl font-r tracking-normal mt-4 text-purple-500">
                  New in vibes,
                </h2>

                <h2 className="text-center mx-[12%] text-2xl font-r tracking-wider my-6 text-gray-800">
                  Complete your Signup
                </h2>

                {/* name input */}
                <div className="mx-[12%] font-r">
                  <input
                    className="w-full text-gray-500 px-3 py-2 rounded-md border-2 tracking-wider border-gray-300 focus:outline-purple-500"
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    placeholder="Name"
                  />
                  {/* Name error */}
                  {nameError && (
                    <p className="text-red-400 px-3 mt-2 font-m tracking-wide text-sm text-left">
                      {nameError}
                    </p>
                  )}
                </div>

                {/* gender input */}
                <div className="mx-[12%] mt-6 font-r">
                  <select
                    className="w-full text-gray-500 px-3 py-2 rounded-md bg-white tracking-wider border-2 border-gray-300 focus:outline-purple-500"
                    id="gender"
                    // defaultValue=""
                    value={gender}
                    onChange={(e) => {
                      setGender(e.target.value);
                    }}
                  >
                    <option value="" disabled hidden>
                      Gender
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                  {/* gender error */}
                  {genderError && (
                    <p className="text-red-400 px-3 mt-2 font-m tracking-wide text-sm text-left">
                      {genderError}
                    </p>
                  )}
                </div>

                {/* college name */}
                <div className="mx-[12%] mt-6 font-r">
                  <select
                    className="w-full text-gray-500 px-3 py-2 rounded-md bg-white tracking-wider  border-2 border-gray-300 focus:outline-purple-500"
                    id="college"
                    value={college}
                    onChange={(e) => {
                      setCollege(e.target.value);
                    }}
                  >
                    <option value="" disabled hidden>
                      College Name
                    </option>
                    <option value="Madan Mohan Malaviya University of Technology">
                      Madan Mohan Malaviya University of Technology
                    </option>
                  </select>
                  {/* college name error */}
                  {collegeError && (
                    <p className="text-red-400 px-3 mt-2 font-m tracking-wide text-sm text-left">
                      {collegeError}
                    </p>
                  )}
                </div>

                <div className="mx-[12%] mt-6 font-r">
                  <select
                    className="w-full text-gray-500 px-3 py-2 rounded-md bg-white tracking-wider  border-2 border-gray-300 focus:outline-purple-500"
                    id="year"
                    value={year}
                    onChange={(e) => {
                      setYear(e.target.value);
                    }}
                  >
                    <option value="" disabled hidden>
                      Select your year
                    </option>
                    <option value="1">1st Year</option>
                    <option value="2">2nd Year</option>
                    <option value="3">3rd Year</option>
                    <option value="4">Final Year</option>
                  </select>
                  {/* year error */}
                  {yearError && (
                    <p className="text-red-400 px-3 mt-2 font-m tracking-wide text-sm text-left">
                      {yearError}
                    </p>
                  )}
                </div>

                <div className="mx-[12%] mt-6 font-r">
                  <select
                    className="w-full text-gray-500 px-3 py-2 rounded-md bg-white tracking-wider  border-2 border-gray-300 focus:outline-purple-500"
                    id="branch"
                    value={branch}
                    onChange={(e) => {
                      setBranch(e.target.value);
                    }}
                  >
                    <option value="" disabled hidden>
                      Course / Branch
                    </option>
                    <option value="CSE">CSE</option>
                    <option value="ITCA">ITCA</option>
                    <option value="ECE">ECE</option>
                    <option value="EE">EE</option>
                    <option value="ME">ME</option>
                    <option value="CE">CE</option>
                    <option value="ChE">ChE</option>
                    <option value="BBA">BBA</option>
                    <option value="B Pharma">B Pharma</option>
                    <option value="MTech">MTech</option>
                    <option value="MCA">MCA</option>
                    <option value="MBA">MBA</option>
                  </select>
                  {/* branch error */}
                  {branchError && (
                    <p className="text-red-400 px-3 mt-2 font-m tracking-wide text-sm text-left">
                      {branchError}
                    </p>
                  )}
                </div>

                <div className="mx-[12%] mt-10 font-r tracking-wide">
                  <button
                    onClick={() => {
                      postData();
                    }}
                    disabled={isLoading}
                    className={`${
                      isLoading ? "bg-purple-500" : "bg-purple-600 py-2"
                    } w-full  rounded-md text-white text-center overflow-hidden`}
                  >
                    {isLoading ? (
                      <img
                        className="h-9 mx-auto z-10"
                        src="https://cdn.pixabay.com/animation/2022/07/29/03/42/03-42-22-68_512.gif"
                        alt="Loading"
                      /> // Replace with your loading image path
                    ) : (
                      <div>Sign Up</div>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default SignupPage;
