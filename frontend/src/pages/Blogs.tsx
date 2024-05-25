import { AppBar } from "../components/AppBar";
import { BlogCard } from "../components/BlogCard";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks/useBlogs";
import { formatDateString } from "../utils/FormatDate";

export const Blogs = () => {
  const { loading, blogs } = useBlogs();

  return (
    <>
      <AppBar>
        {loading ? (
          <>
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
          </>
        ) : (
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
        )}
      </AppBar>
    </>
  );
};
