import React from "react";
import { Link } from "react-router-dom";

function ContactPage() {
  return (
    <div>
      <h1 className="mx-[12vw] lg:mx-2 mt-16  font-r text-2xl text-gray-700">
        Contact Us
      </h1>
      <h2 className="mx-[12vw] lg:mx-2 mt-6  font-r text-xl text-gray-700">
        Instagram
      </h2>
      <Link
        to="https://www.instagram.com/vibes.incampus?igsh=cGxldzZ6Zzc3NnNr"
        className="text-purple-600 mx-[12vw] lg:mx-2"
      >
        vibes.incampus
      </Link>
      <h2 className="mx-[12vw] lg:mx-2 mt-6  font-r text-xl text-gray-700">Email</h2>
      <a href="mailto:vibes.incampus@gmail.com" className="text-purple-600 mx-[12vw] lg:mx-2">
        vibes.incampus@gmail.com
      </a>
    </div>
  );
}

export default ContactPage;
