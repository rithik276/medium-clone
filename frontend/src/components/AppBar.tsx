import { useNavigate } from "react-router-dom";
import { SideBar } from "./SideBar";

interface Props {
  children: React.ReactNode;
}

export const AppBar: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="">
        <div className="fixed top-0 w-full h-14 flex justify-between items-center border-b z-50 bg-slate-50 border-slate-200 shadow-lg  ">
          <div
            className="mx-12 text-2xl font-bold cursor-pointer"
            onClick={() => {
              navigate("/blogs");
            }}
          >
            Medium
          </div>
          <div className="mx-12 flex items-center gap-3">
            <div>
              <button
                type="button"
                className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-1.5 text-center me-2"
              >
                Create Post
              </button>
            </div>
            <div className="cursor-pointer relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-black rounded-full ">
              <span className="text-sm font-medium text-gray-200 ">{"RB"}</span>
            </div>
          </div>
        </div>
        <SideBar />
        <div className="xl:ml-40">{children}</div>
      </div>
    </>
  );
};
