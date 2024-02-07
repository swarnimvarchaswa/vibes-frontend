import React, {useState} from "react";

function UploadPhoto() {
  return (
    <div>
      <img
        className="w-[50%] mx-[25%] mt-[10%]"
        src="https://res.cloudinary.com/booktrade/image/upload/v1706995946/logo_g8glsg.png"
        alt="vibes logo"
      />

      <h2 className="text-center text-2xl font-r tracking-wider my-6 text-gray-800">
        Your Profile Pic
      </h2>

      <div className="mb-2 mx-[12%] font-r tracking-wider">
        <input
          className="w-full px-3 py-1 rounded-md border-2 border-gray-300 focus:outline-purple-500 bg-white"
          type="file"
          id="bookCover"
          name="bookCover"
          accept=".jpg,.jpeg,.png"
          // Changed the onChange handler
          placeholder="Book Cover"
        />
      </div>

      <div className="mx-[12%] mt-10 font-r tracking-wide">
        <button className="bg-purple-600 w-full py-2 rounded-md text-white">
          Next
        </button>
      </div>
    </div>
  );
}

export default UploadPhoto;
