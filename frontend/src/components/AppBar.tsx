import { Link, useNavigate } from "react-router-dom";
import { SideBar } from "./SideBar";
import { Button } from "./Button";
import { useState } from "react";
import { UserPopup } from "./UserPopup";
import { useRecoilValue } from "recoil";
import { UserDetails } from "../utils/UserDetails";
import { FormatName } from "../utils/FormatName";

interface Props {
  children: React.ReactNode;
}

export const AppBar: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();
  const userDetails = useRecoilValue(UserDetails);

  const [showPopup, setShowPopup] = useState(false);
  const handlePopup = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowPopup(!showPopup);
  };
  return (
    <>
      <div className="">
        <div className="fixed top-0 w-full h-14 flex justify-between items-center border-b z-50 bg-slate-50 border-slate-200 shadow-lg  ">
          <Link to={"/"} className="mx-12 text-2xl font-bold cursor-pointer">
            Medium
          </Link>
          <div className="mx-12 flex items-center gap-3">
            <div>
              <Button
                value={"Create Post"}
                onClick={() => navigate("/create/blog")}
              />
            </div>
            <div
              onClick={(e) => handlePopup(e)}
              className="cursor-pointer relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-black rounded-full "
            >
              <span className="text-sm font-medium text-gray-200 ">
                {FormatName(userDetails.name)}
              </span>
            </div>
            {showPopup && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="absolute top-full right-8 mt-1"
              >
                <UserPopup />
              </div>
            )}
          </div>
        </div>
        <div className="flex mt-14">
          <SideBar />
          <div className="w-full px-10 lg:px-0 lg:w-[80%]">{children}</div>
        </div>
      </div>
    </>
  );
};
