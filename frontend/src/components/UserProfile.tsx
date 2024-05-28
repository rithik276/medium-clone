import { useRecoilValue } from "recoil";
import { UserDetails } from "../utils/UserDetails";
import { useState } from "react";
import { ForgotPassword } from "./ForgotPassword";
import { EditUserDetails } from "./EditUserDetails";

export const UserProfile = () => {
  const userDetails = useRecoilValue(UserDetails);
  const [showPassword, setShowPassword] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(true);
  const [selectedButton, setSelectedButton] = useState("edit_profile");

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const value = e.currentTarget.value;
    setSelectedButton(value);

    if (value === "edit_profile") {
      setShowPassword(false);
      setShowEditProfile(true);
    } else if (value === "change_password") {
      setShowPassword(true);
      setShowEditProfile(false);
    }
  };

  return (
    <div className="pt-10 pl-10 ml-10 border-l border-slate-500 h-screen">
      <div className="font-bold text-4xl capitalize">{userDetails.name}</div>
      <div className="pt-5 flex gap-2">
        <div>
          <button
            type="button"
            value="edit_profile"
            className={`text-xs px-3 py-1.5 me-2 mb-2 font-medium rounded-full focus:outline-none focus:ring-4 ${
              selectedButton === "edit_profile"
                ? "bg-gray-800 text-white hover:bg-gray-500 focus:ring-gray-300"
                : "bg-white text-black border border-slate-400"
            }`}
            onClick={handleClick}
          >
            Edit Profile
          </button>
        </div>
        <div>
          <button
            type="button"
            value="change_password"
            className={`text-xs px-3 py-1.5 me-2 mb-2 font-medium rounded-full focus:outline-none focus:ring-4 ${
              selectedButton === "change_password"
                ? "bg-gray-800 text-white hover:bg-gray-500 focus:ring-gray-300"
                : "bg-white text-black border border-slate-400"
            }`}
            onClick={handleClick}
          >
            Change Password
          </button>
        </div>
      </div>
      <div>{showPassword && <ForgotPassword />}</div>
      <div>{showEditProfile && <EditUserDetails />}</div>
    </div>
  );
};
