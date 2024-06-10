import { atom, selector } from "recoil";
import { BACKEND_URL } from "../config";
import axios from "axios";

export const blogsState = atom({
  key: "blogsState",
  default: [],
});

export const GetBlogs = selector({
  key: "GetBlogs",
  get: async () => {
    try {
      const id = localStorage.getItem("userId");
      if (!id) {
        console.error("No userId found in localStorage");
        return [];
      }

      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found in localStorage");
        return [];
      }

      const res = await axios.get(
        `${BACKEND_URL}/api/v1/blog/user_blogs/${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      return res.data.blog || [];
    } catch (error) {
      console.error("Error fetching the user details:", error);
      return [];
    }
  },
});
