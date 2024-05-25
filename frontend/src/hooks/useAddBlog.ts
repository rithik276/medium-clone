import axios from "axios";
import { useState } from "react";
import { BACKEND_URL } from "../config";

interface body {
  title: string;
  content: string;
  id?: string;
}

export const useAddBlog = () => {
  const [loading, setLoading] = useState(false);
  const addBlog = async (data: {
    title: string;
    content: string;
    id?: string;
    published: boolean;
  }): Promise<body> => {
    setLoading(true);
    try {
      if (data.id) {
        const res = await axios.put(
          `${BACKEND_URL}/api/v1/blog`,
          { ...data },
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        setLoading(false);
        return res.data;
      } else {
        const res = await axios.post(
          `${BACKEND_URL}/api/v1/blog`,
          { ...data },
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        setLoading(false);
        return res.data;
      }
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  return {
    addBlog,
    loading,
  };
};
