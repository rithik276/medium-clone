import { selector } from "recoil";
import { BACKEND_URL } from "../config";
import axios from "axios";

export const GetBlogs = selector({
  key: "GetBlogs",
  get: async () => {
    try {
      const id: string = "3ac3a0c5-f990-4930-a58d-b6721965333e";
      const res = await axios.get(
        `${BACKEND_URL}/api/v1/blog/user_blogs/${id}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      return res.data.blog || [];
    } catch (error) {
      alert("error fetching the user details");
      return [];
    }
  },
});
