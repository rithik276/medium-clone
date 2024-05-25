import { Link } from "react-router-dom";
import { Avatar } from "./Avatar";

interface BlogCardProps {
  id: string;
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
}

export const BlogCard = ({
  id,
  authorName,
  title,
  content,
  publishedDate,
}: BlogCardProps) => {
  return (
    <>
      <Link to={`/blog/${id}`}>
        <div className="mt-5">
          <div className="flex items-center">
            <Avatar name={authorName} />
            <div className="font-small ml-2 capitalize">{authorName}</div>
            <div className="ml-2 text-slate-400">
              <span className="font-bold"> · </span>
              {publishedDate}
            </div>
          </div>
          <div className="grid grid-flow-col gap-32 col-span-3 items-center">
            <div className="col-span-2">
              <div className="font-bold mt-2 text-2xl">{title}</div>
              <div className="font-medium text-base pt-3">
                {content.length > 100 ? content.slice(0, 350) + "..." : content}
              </div>
            </div>
            <div className="col-span-1 flex justify-end">
              <img
                src="https://miro.medium.com/v2/resize:fill:140:140/1*Rg_Np4A_cMWxK2n_pJw84Q.jpeg"
                alt=""
              />
            </div>
          </div>
          <div className="mt-2 text-slate-600">
            {Math.ceil(content.length / 100)} min read{" "}
          </div>
          <div className="mt-3 border-b h-1 w-full"></div>
        </div>
      </Link>
    </>
  );
};
