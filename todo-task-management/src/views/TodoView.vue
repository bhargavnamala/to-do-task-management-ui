<template>
  <v-container
    class="d-flex justify-center align-center"
    style="min-height: 100vh;"
  >
    <v-card
      elevation="10"
      class="pa-8"
      width="900"
    >
      <!-- Header -->
      <div class="d-flex justify-space-between align-center mb-8">
        <h1 class="text-h5 font-weight-bold">ToDo List</h1>

        <AppButton
          variant="secondary"
          class="px-6 py-2"
          @click="logout"
        >
          Logout
        </AppButton>
      </div>

      <!-- Form -->
      <TodoForm @saved="reload" />

      <!-- List -->
      <div class="mt-10">
        <TodoList />
      </div>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import TodoList from "../components/TodoList.vue";
import TodoForm from "../components/TodoForm.vue";
import { useAuthStore } from "../stores/authStore";
import { useTodoStore } from "../stores/todoStore";

const auth = useAuthStore();
const todos = useTodoStore();

todos.load();

function reload() {
  todos.load();
}

function logout() {
  auth.logout();
}
</script>
