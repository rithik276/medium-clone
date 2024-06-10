import axios, { AxiosRequestConfig } from "axios";
import { atom, selector } from "recoil";
import { BACKEND_URL } from "../config";

export const isUserSignedIn = atom({
  key: "isUserSignedIn",
  default: false,
});

export const UserDetails = selector({
  key: "UserDetails",
  get: async ({ get }) => {
    const signedIn = get(isUserSignedIn);
    if (!signedIn) {
      return [];
    }

    try {
      const params: { id: string | null } = {
        id: localStorage.getItem("userId"),
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
