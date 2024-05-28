import { FormatName } from "../utils/FormatName";

interface Props {
  title: string;
  content: string;
  publishedDate: string;
  authorName: string;
  aboutAuthor: string;
}

export const FullBlogView = ({
  title,
  content,
  publishedDate,
  authorName,
  aboutAuthor,
}: Props) => {
  const avatarLogo = FormatName(authorName);
  return (
    <div className="px-10 cursor-pointer flex">
      <div className="w-[75%] py-5">
        <div className="text-7xl font-bold capitalize">{title}</div>
        <div>
          <h1 className="mt-7 text-slate-500">Posted on {publishedDate}</h1>
        </div>
        <div className="pt-10 tracking-tight text-lg">{content}</div>
      </div>
      <div className="py-10 px-10 flex flex-col justify-start items-start w-[25%]">
        <div>
          <h1 className="font-semibold mb-4">Author</h1>
        </div>
        <div className=" flex gap-4 justify-center items-center">
          <div>
            <div className="cursor-pointer relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-black rounded-full ">
              <span className="text-sm font-medium text-gray-200 ">
                {avatarLogo}
              </span>
            </div>
          </div>
          <div>
            <h3 className="text-xl capitalize font-bold">{authorName}</h3>
            <h5 className="text-slate-400 tracking-tighter leading-6">
              {aboutAuthor}
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};
