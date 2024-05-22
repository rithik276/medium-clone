import { useState } from "react";
import InputBox from "./InputBox";
import { useNavigate } from "react-router-dom";
import { SignUpInput } from "@rithik276/medium-common";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { AuthHeader } from "./AuthHeader";

export const SignUpAuth = () => {
  const [postInputs, setPostInputs] = useState<SignUpInput>({
    name: "",
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const sendRequest = async () => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/signup`,
        postInputs
      );
      const jwt = response.data.jwt;
      localStorage.setItem("token", jwt);
      navigate("/blogs");
    } catch (e) {
      alert("SignUp failed");
    }
  };

  return (
    <>
      {/* Left half start  */}
      <div className="px-10 mt-20 lg:mt-0 lg:px-0 flex flex-col justify-center items-center">
        <AuthHeader type="signup" />
        {/* </div> */}
        <div className="w-full lg:w-[50%]">
          <InputBox
            label="Name"
            type="text"
            placeholder="Enter your name"
            onChange={(e) => {
              setPostInputs({ ...postInputs, name: e.target.value });
            }}
          />
          <InputBox
            label="Email"
            type="email"
            placeholder="Enter Your Email"
            onChange={(e) => {
              setPostInputs({ ...postInputs, username: e.target.value });
            }}
          />
          <InputBox
            label="Password"
            type="Password"
            placeholder="Enter Your Password"
            onChange={(e) => {
              setPostInputs({ ...postInputs, password: e.target.value });
            }}
          />
          <button
            type="button"
            className="mt-6 text-white bg-black font-medium rounded-lg text-md px-5 py-2.5 me-2 mb-2 w-full"
            onClick={() => {
              sendRequest();
            }}
          >
            Sign Up
          </button>
        </div>

        {/* Left half end  */}
      </div>
    </>
  );
};
