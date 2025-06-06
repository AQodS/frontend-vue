// import useMutation dari '@tanstack/vue-query';
import { useMutation } from "@tanstack/vue-query";

//import service API
import API from "../../services/api";
import Cookies from "js-cookie";

//interface UserRequest untuk update
interface UserRequest {
  name: string;
  username: string;
  email: string;
  password?: string; // password optional, bisa jadi tidak ingin diubah
}

export const useUserUpdate = () => {
  return useMutation({
    // Mutation untuk update user
    mutationFn: async ({ id, data }: { id: number; data: UserRequest }) => {
      // Ambil token dari cookies
      const token = Cookies.get("token");

      // Gunakan service API untuk melakukan update user
      const response = await API.put(`/api/users/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Mengembalikan response data
      return response.data;
    },
  });
};
