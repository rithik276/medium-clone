import { Link, useNavigate } from "react-router-dom";
import { SideBar } from "./SideBar";
import { Button } from "./Button";
import { useState, useEffect } from "react";
import { UserPopup } from "./UserPopup";
import { useRecoilValueLoadable } from "recoil";
import { UserDetails } from "../utils/UserDetails";
import { FormatName } from "../utils/FormatName";

interface Props {
  children: React.ReactNode;
}

export const AppBar: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();
  const userDetailsLoadable = useRecoilValueLoadable(UserDetails);
  const [showPopup, setShowPopup] = useState(false);

  const handlePopup = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowPopup(!showPopup);
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (showPopup && !(e.target as HTMLElement).closest(".popup-container")) {
      setShowPopup(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showPopup]);

  return (
    <div>
      <div className="fixed top-0 w-full h-14 flex justify-between items-center border-b z-50 bg-slate-50 border-slate-200 shadow-lg">
        <Link to="/" className="mx-12 text-2xl font-bold cursor-pointer">
          Medium
        </Link>
        <div className="mx-12 flex items-center gap-3">
          <Button
            value="Create Post"
            onClick={() => navigate("/create/blog")}
          />
          {userDetailsLoadable.state === "loading" ? (
            <div className="loader">Loading...</div>
          ) : userDetailsLoadable.state === "hasValue" ? (
            <div
              onClick={handlePopup}
              className="cursor-pointer relative inline-flex items-center justify-center w-8 h-8  bg-black rounded-full popup-container"
            >
              <span className="text-sm font-medium text-gray-200">
                {FormatName(userDetailsLoadable.contents.name)}
              </span>
              {showPopup && (
                <div className="absolute top-full right-0 mt-1 popup-container">
                  <UserPopup />
                </div>
              )}
            </div>
          ) : (
            <div>Error loading user details</div>
          )}
        </div>
      </div>
      <div className="flex mt-14">
        <SideBar />
        <div className="w-full px-10 lg:px-0 lg:w-[80%]">{children}</div>
      </div>
    </div>
  );
};
