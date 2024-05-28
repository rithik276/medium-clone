import { useRecoilValue } from "recoil";
import { UserDetails } from "../utils/UserDetails";
import { Link } from "react-router-dom";

export const UserPopup = () => {
  const userDetails = useRecoilValue(UserDetails);
  return (
    <>
      <div className="">
        <div className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 ">
          <div className="px-4 py-3 text-sm text-gray-900 ">
            <div className="capitalize">{userDetails.name}</div>
            <div className="font-medium mt-1 truncate">{userDetails.email}</div>
          </div>
          <ul
            className="py-2 text-sm text-gray-700 "
            aria-labelledby="avatarButton"
          >
            <li>
              <Link to={"/"} className="block px-4 py-2 hover:bg-gray-100 ">
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to={"/profile"}
                className="block px-4 py-2 hover:bg-gray-100 "
              >
                Profile
              </Link>
            </li>
          </ul>
          <div className="py-1">
            <Link
              to={"/signout"}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 "
            >
              Sign out
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
