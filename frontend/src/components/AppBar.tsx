import { Link } from "react-router-dom";
import { SideBar } from "./SideBar";
import { Button } from "./Button";

interface Props {
  children: React.ReactNode;
}

export const AppBar: React.FC<Props> = ({ children }) => {
  return (
    <>
      <div className="">
        <div className="fixed top-0 w-full h-14 flex justify-between items-center border-b z-50 bg-slate-50 border-slate-200 shadow-lg  ">
          <Link to={"/"} className="mx-12 text-2xl font-bold cursor-pointer">
            Medium
          </Link>
          <div className="mx-12 flex items-center gap-3">
            <div>
              <Button value={"Create Post"} />
            </div>
            <div className="cursor-pointer relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-black rounded-full ">
              <span className="text-sm font-medium text-gray-200 ">{"RB"}</span>
            </div>
          </div>
        </div>
        <div className="flex mt-14">
          <SideBar />
          <div className="w-full px-10 lg:px-0 lg:w-[80%] py-5">{children}</div>
        </div>
      </div>
    </>
  );
};
