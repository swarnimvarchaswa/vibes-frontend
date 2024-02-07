import React, { useState } from "react";

function Que1({ number, text, options, onNextQuestion }) {
  const [selectedOption, setSelectedOption] = useState(null);

  const validOptions = Array.isArray(options) ? options : [];

  const handleOptionClick = (option) => {
    // console.log("Full stack")
    // console.log(option)
    setSelectedOption(option);
    onNextQuestion(option);
  };

  // const clicked = () => {
  //   console.log("clicked");
  // };

  return (
    <div>
      <div className=" absolute top-0 bottom-0 w-dvw bg-gradient-to-b from-50% from-purple-500  to-purple-200 opacity-30"></div>

      {/* <h1>Hello world</h1> */}

      <div className="z-10 absolute top-0 bottom-0 w-dvw">
        <div className="z-10 absolute top-[6%] left-[10%] h-[60px] w-[60px] rounded-[50%] bg-gradient-to-b from-purple-500 to-purple-900">
          <div className="relative top-[5px] left-[5px] h-[50px] w-[50px] rounded-[50%] bg-gradient-to-t from-purple-500 to-purple-900">
            <p className="relative top-[5px] left-[7px] text-[30px] text-white font-semibold">
              {number}
            </p>
          </div>
        </div>

        <img
          className="z-10 absolute top-[5%] right-[10%] w-[18%]"
          src="https://res.cloudinary.com/booktrade/image/upload/v1706995946/logo_g8glsg.png"
          alt="vibes logo"
        />

        <p className="mt-52 mx-[12%] font-r text-3xl text-gray-700 leading-10">{text}</p>

        <div className="mt-4 mx-[12%]">
          {validOptions.map((option, index) => (
            <button
              key={index}
              className="mt-10 bg-gradient-to-tr from-purple-700 to-purple-500 w-full rounded-2xl text-2xl tracking-normal font-r font-medium text-white py-3 shadow-2xl shadow-white hover:border-2 border-orange-500 focus:border-0"
              onClick={() => handleOptionClick(option)}
              // onClick={() => clicked()}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Que1;

