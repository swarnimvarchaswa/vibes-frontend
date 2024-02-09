import React from "react";
import { Link } from "react-router-dom";

import Verification from "../Icons/VerificationfillIcon";

function VerifyPage() {
  return (
    <div>
      <h1 className="mx-[12vw] mt-16  font-r text-2xl text-gray-700">
        To Verify your Account
      </h1>
      <p className="mx-[12vw] mt-6 font-r text-justify text-gray-700">
        Verifying your account adds an extra layer of security to your vibes
        experience. It helps us ensure that you are the rightful owner of the
        account and prevents unauthorized access. Verified accounts are also
        more likely to gain trust within our community.
      </p>
      <h2 className="mx-[12vw] mt-6  font-r text-xl text-gray-700">
        How's it will look like
      </h2>
      <h1 className="text-2xl mx-[12vw] mt-6 text-center text-purple-600 border-2">
        Riya Singh
        <span className="relative inline-flex items-center ml-1 top-1">
          <Verification />
        </span>
      </h1>
      <h2 className="mx-[12vw] mt-12  font-r text-xl text-gray-700">
        How to Verify Your Account:
      </h2>
      <p className="mx-[12vw] mt-6 font-r text-justify text-gray-700">
        You need to text to our official instagram page{" "}
        <Link
          to="https://www.instagram.com/vibes.incampus?igsh=cGxldzZ6Zzc3NnNr"
          className="text-purple-600"
        >
          vibes.incampus{" "}
        </Link>
        from your main account
      </p>
      <p className="mx-[12vw] mt-6 font-r text-justify text-gray-700">
        Your text should include your registered vibes email address.
      </p>
      <p className="mx-[12vw] mt-6 font-r text-justify text-gray-700">
        Our team will review the verification text and cross-reference it with
        your registered email. If the information is secure and matches our
        records, your account will be verified.{" "}
      </p>

      <br />
      <br />
      <br />
    </div>
  );
}

export default VerifyPage;
