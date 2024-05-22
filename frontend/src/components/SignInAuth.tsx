import { useState } from "react";
import InputBox from "./InputBox";
import { useNavigate } from "react-router-dom";
import { SignInInput } from "@rithik276/medium-common";
import axios from "axios";
import { BACKEND_URL } from "../config";
import {AuthHeader} from "./AuthHeader";

export const SignInAuth = () => {
  const [postInputs, setPostInputs] = useState<SignInInput>({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const sendRequest = async () => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/signin`,
        postInputs
      );
      const jwt = response.data.jwt;
      localStorage.setItem("token", jwt);
      navigate("/blogs");
    } catch (e) {
      // need to handle errors using toasts in both signin and signup
      alert("SignIn failed");
    }
  };

  return (
    <>
      {/* Left half start  */}
      <div className="px-10 mt-20 lg:mt-0 lg:px-0 flex flex-col justify-center items-center">
        <AuthHeader type="signin" />
        {/* </div> */}
        <div className="w-full lg:w-[50%]">
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
            onClick={sendRequest}
          >
            Sign In
          </button>
        </div>

        {/* Left half end  */}
      </div>
    </>
  );
};
