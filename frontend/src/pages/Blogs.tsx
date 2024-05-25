import { AppBar } from "../components/AppBar";
import { BlogCard } from "../components/BlogCard";
import { useBlogs } from "../hooks/useBlogs";
import { formatDateString } from "../utils/FormatDate";

export const Blogs = () => {
  const { loading, blogs } = useBlogs();
  if (loading) {
    return <div>loading...</div>;
  }
  return (
    <>
      <AppBar>
        <div className="cursor-pointer px-10 py-6">
          {blogs.map(
            (blog) =>
              blog.published && (
                <BlogCard
                  id={blog.id}
                  authorName={blog.author.name || "Anonymous"}
                  title={blog.title}
                  content={blog.content}
                  publishedDate={formatDateString(blog.publishedDate)}
                  key={blog.id}
                />
              )
          )}
        </div>
      </AppBar>
    </>
  );
};
