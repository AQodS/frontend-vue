<script setup lang="ts">
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import Cookies from "js-cookie";
import { useLogin } from "../../composables/auth/useLogin";

interface ValidationErrors {
  [key: string]: string;
}

const router = useRouter();

const { mutate, isPending } = useLogin();

const username = ref<string>("");
const password = ref<string>("");

const errors = reactive<ValidationErrors>({});

const handleLogin = (e: Event) => {
  e.preventDefault();

  //call mutate function from useLogin
  mutate(
    {
      username: username.value,
      password: password.value,
    },
    {
      onSuccess: (data: any) => {
        Cookies.set("token", data.data.token);
        Cookies.set(
          "user",
          JSON.stringify({
            id: data.data.id,
            name: data.data.name,
            username: data.data.username,
            email: data.data.email,
          })
        );

        router.push("/admin/dashboard");
      },
      onError: (error: any) => {
        //assign errors with the error response
        Object.assign(errors, error.response.data.errors);
      },
    }
  );
};
</script>

<template>
  <div class="row justify-content-center mt-5">
    <div class="col-md-4">
      <div class="card border-0 rounded-4 shadow-sm">
        <div class="card-body">
          <h4 class="fw-bold text-center">Login</h4>
          <hr />
          <div v-if="errors.Error" class="alert alert-danger mt-2 rounded-4">
            Username or Password is incorrect
          </div>
          <form @submit="handleLogin">
            <div class="form-group mb-3">
              <label class="mb-1 fw-bold">Username</label>
              <input
                v-model="username"
                type="text"
                class="form-control"
                placeholder="Username"
              />
              <div
                v-if="errors.Username"
                class="text-danger p-2"
              >
                {{ errors.Username }}
              </div>
            </div>

            <div class="form-group mb-3">
              <label class="mb-1 fw-bold">Password</label>
              <input
                v-model="password"
                type="password"
                class="form-control"
                placeholder="Password"
              />
              <div
                v-if="errors.Password"
                class="text-danger p-2"
              >
                {{ errors.Password }}
              </div>
            </div>

            <button
              type="submit"
              class="btn btn-primary w-100 rounded-4"
              :disabled="isPending"
            >
              {{ isPending ? "Loading..." : "Login" }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang=""></style>
