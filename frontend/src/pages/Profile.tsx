import { useRecoilValue } from "recoil";
import { AppBar } from "../components/AppBar";
import { GetBlogs } from "../utils/GetBlogs";
import { UserBlogCard } from "../components/UserBlogCard";
import { UserProfile } from "../components/UserProfile";

interface BlogCardProps {
  id: string;
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
  author: {
    name: string;
  };
  published: boolean;
}

export const Profile = () => {
  const blogs = useRecoilValue(GetBlogs);
  return (
    <>
      <AppBar>
        <div className="flex h-screen">
          <div className="w-[50%]">
            <h1 className="font-bold text-2xl pt-10 border-b border-slate-500 pb-3">
              Your Blogs
            </h1>
            {blogs.map((b: BlogCardProps) => (
              <UserBlogCard
                id={b.id}
                authorName={b.author.name}
                title={b.title}
                content={b.content}
                publishedDate={b.publishedDate}
                published={b.published}
              />
            ))}
          </div>
          <div className="bg-blue-00 w-[50%] ">
            <UserProfile />
          </div>
        </div>
      </AppBar>
    </>
  );
};
