import { useQuery } from "@tanstack/vue-query";
import API from "../../services/api";
import Cookies from "js-cookie";

//interface User
export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

//composable useUsers dengan return type User
export const useUsers = () => {
  return useQuery<User[], Error>({
    //query key
    queryKey: ["users"],

    //query function
    queryFn: async () => {
      //get token from cookies
      const token = Cookies.get("token");

      //get users from api
      const response = await API.get("/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      //return data
      return response.data.data as User[];
    },
  });
};
