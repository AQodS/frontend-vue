import { useMutation } from "@tanstack/vue-query";
import API from "../../services/api";

interface LoginRequest {
  username: string;
  password: string;
}

export const useLogin = () => {
  return useMutation({
    mutationFn: async (data: LoginRequest) => {
      const response = await API.post("/api/login", data);
      return response.data;
    },
  });
};
