import { useMutation } from "@tanstack/vue-query";

//import service API
import API from "../../services/api";

//interface RegisterRequest
interface RegisterRequest {
  name: string;
  username: string;
  email: string;
  password: string;
}

export const useRegister = () => {
  return useMutation({
    // mutation untuk register
    mutationFn: async (data: RegisterRequest) => {
      //menggunakan service API untuk register
      const response = await API.post("/api/register", data);

      return response.data;
    },
  });
};
