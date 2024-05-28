import axios, { AxiosRequestConfig } from "axios";
import { selector } from "recoil";
import { BACKEND_URL } from "../config";

export const UserDetails = selector({
  key: "UserDetails",
  get: async () => {
    try {
      const params: { id: string } = {
        id: "82ce6b08-de72-41d5-9c0d-8fbdcaa9dab8",
      };
      const config: AxiosRequestConfig = {
        params,
      };
      const res = await axios.get(`${BACKEND_URL}/api/v1/user/user_details`, {
        ...config,
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      return res.data || [];
    } catch (error) {
      alert("error fetching the user details");
      return [];
    }
  },
});
