import { Link } from "react-router-dom";
import { formatDateString } from "../utils/FormatDate";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useState } from "react";

interface BlogCardProps {
  id: string;
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
  published: boolean;
}

export const UserBlogCard = ({
  id,
  title,
  publishedDate,
  published,
}: BlogCardProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClickStatus = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setIsLoading(true);
    const target = e.currentTarget as HTMLButtonElement;
    const published = target.value == "publish" ? true : false;

    const url = `${BACKEND_URL}/api/v1/blog/updateBlogStatus`;
    const data = { id, published };
    try {
      await axios.post(url, data, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      window.location.reload();
      setIsLoading(false);
    } catch (e) {
      alert("error updating the blog status");
      setIsLoading(false);
    }
  };

  return (
    <>
      <Link to={`/blog/${id}`}>
        <div className="mt-5">
          <div className="flex items-center">
            <div className=" text-slate-400">
              {published ? (
                <button
                  type="button"
                  value="private"
                  className="text-white bg-green-700 hover:bg-green-800  rounded-2xl text-xs px-1.5 py-1 text-center mr-2 mb-2"
                  onClick={(e) => handleClickStatus(e)}
                >
                  {isLoading ? "Loading..." : "Click to Private"}
                </button>
              ) : (
                <button
                  type="button"
                  value="publish"
                  className="text-white bg-red-700 hover:bg-red-800 rounded-2xl text-xs px-1.5 py-1 text-center mr-2 mb-2"
                  onClick={(e) => handleClickStatus(e)}
                >
                  {isLoading ? "Loading..." : "Click to Private"}
                </button>
              )}
              <span className="font-bold"> · </span>
              {formatDateString(publishedDate)}
            </div>
          </div>
          <div className="grid grid-flow-col gap-32 col-span-3 items-center">
            <div className="col-span-2">
              <div className="font-bold mt-2 text-2xl">{title}</div>
            </div>
          </div>
          <div className="mt-3 border-b h-1 w-full"></div>
        </div>
      </Link>
    </>
  );
};
