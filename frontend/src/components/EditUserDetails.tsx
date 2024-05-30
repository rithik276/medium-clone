import { useRecoilValue } from "recoil";
import { UserDetails } from "../utils/UserDetails";
import { useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";

export const EditUserDetails = () => {
  const userDetails = useRecoilValue(UserDetails);
  const [name, setName] = useState(userDetails.name);
  const [about, setAbout] = useState(userDetails.about);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleAboutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAbout(e.target.value);
  };

  const handleSubmit = async () => {
    const data: Partial<{ id: string; name: string; about: string }> = {
      id: userDetails.id,
      name,
      about,
    };

    const url = `${BACKEND_URL}/api/v1/user/updateUserDetails`;
    try {
      await axios.post(url, data, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      alert("User details updated successfully!");
    } catch (e) {
      alert("Error updating user details");
    }
  };

  return (
    <div className="w-[90%] mt-10">
      <div className="mb-6">
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Email address
        </label>
        <input
          type="email"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          value={userDetails.email}
          disabled
        />
      </div>

      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium text-gray-900 ">
          Name
        </label>
        <input
          onChange={handleNameChange}
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
          value={name}
        />
      </div>
      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium text-gray-900 ">
          About
        </label>
        <input
          onChange={handleAboutChange}
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 "
          value={about}
        />
      </div>
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};
