import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";

interface Blog {
  id: string;
  title: string;
  content: string;
  publishedDate: string;
  published: boolean;
  author: {
    name: string;
  };
}

export const useBlog = ({ blog_id }: { blog_id: string | undefined }) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog>(Object);
  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/blog/${blog_id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setBlog(res.data.blog);
        setLoading(false);
      });
  }, [blog_id]);
  return {
    loading,
    blog,
  };
};
