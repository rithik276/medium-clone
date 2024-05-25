import { useParams } from "react-router-dom";
import { useBlog } from "../hooks/useBlog";
import { FullBlogView } from "../components/FullBlogView";
import { formatDateString } from "../utils/FormatDate";
import { AppBar } from "../components/AppBar";

export const Blog = () => {
  const { id } = useParams<{ id: string }>();
  const { loading, blog } = useBlog({ blog_id: id });
  if (loading) {
    return <div>Loading..</div>;
  }
  return (
    <div>
      <AppBar>
        <FullBlogView
          title={blog.title}
          content={blog.content}
          publishedDate={formatDateString(blog.publishedDate)}
          authorName={blog.author.name || "Anonymous"}
        />
      </AppBar>
    </div>
  );
};
