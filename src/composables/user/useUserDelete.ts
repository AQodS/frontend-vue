import { useMutation } from "@tanstack/vue-query";
import API from "../../services/api";
import Cookies from "js-cookie";

// composable untuk delete user
export const useUserDelete = () => {
  return useMutation({
    // Mutation function untuk delete user
    mutationFn: async (id: number) => {
      // Ambil token dari cookies
      const token = Cookies.get("token");

      // Lakukan request DELETE ke endpoint API
      const response = await API.delete(`/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Kembalikan response
      return response.data;
    },
  });
};
