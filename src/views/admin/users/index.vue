<script setup lang="ts">
import { useQueryClient } from "@tanstack/vue-query";
import { useUsers } from "../../../composables/user/useUsers";
import { useUserDelete } from "../../../composables/user/useUserDelete";
import SidebarMenu from "../../../components/SidebarMenu.vue";
const { data: users, isLoading, isError, error } = useUsers();
const queryClient = useQueryClient();
const { mutate, isPending } = useUserDelete();

const handleDelete = (id: number) => {
  if (confirm("Are you sure you want to delete this user?")) {
    // Call delete user mutation
    mutate(id, {
      onSuccess: () => {
        // Invalidate users query to refresh the list
        queryClient.invalidateQueries({ queryKey: ["users"] });
      },
    });
  }
};
</script>

<template>
  <div class="container mt-5 mb-5">
    <div class="row">
      <div class="col-md-3">
        <SidebarMenu />
      </div>
      <div class="col-md-9">
        <div class="card border-0 rounded-4 shadow-sm">
          <div
            class="card-header d-flex justify-content-between align-items-center"
          >
            <span>Users</span>
            <router-link
              to="/admin/users/create"
              class="btn btn-sm btn-success rounded-4 shadow-sm border-0"
            >
              Add User
            </router-link>
          </div>
          <div class="card-body">
            <div v-if="isLoading" class="alert alert-info text-center">
              Loading...
            </div>

            <div v-if="isError" class="alert alert-danger text-center">
              Error: {{ error?.message }}
            </div>

            <table v-if="users" class="table table-bordered">
              <thead class="bg-dark text-white">
                <tr>
                  <th>Full Name</th>
                  <th>Username</th>
                  <th>Email Address</th>
                  <th style="width: 20%">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="user in users" :key="user.id">
                  <td>{{ user.name }}</td>
                  <td>{{ user.username }}</td>
                  <td>{{ user.email }}</td>
                  <td class="text-center">
                    <router-link
                      :to="`/admin/users/edit/${user.id}`"
                      class="btn btn-sm btn-primary rounded-4 shadow-sm border-0 me-2"
                    >
                      Edit
                    </router-link>
                    <button
                      @click="handleDelete(user.id)"
                      :disabled="isPending"
                      class="btn btn-sm btn-danger rounded-4 shadow-sm border-0"
                    >
                      {{ isPending ? "Deleting..." : "Delete" }}
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
