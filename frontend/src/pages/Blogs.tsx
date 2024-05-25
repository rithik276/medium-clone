import { AppBar } from "../components/AppBar";
import { BlogCard } from "../components/BlogCard";
import { useBlogs } from "../hooks";
import { formatDateString } from "./utils/FormatDate";

export const Blogs = () => {
  const { loading, blogs } = useBlogs();
  if (loading) {
    return <div>loading...</div>;
  }
  return (
    <>
      <AppBar>
        <div className="px-5 xl:px-40 py-10 cursor-pointer">
          {blogs.map((blog) => (
            <BlogCard
              authorName={blog.author.name}
              title={blog.title}
              content={blog.content}
              publishedDate={formatDateString(blog.publishedDate)}
              key={blog.id}
            />
          ))}
        </div>
      </AppBar>
    </>
  );
};
