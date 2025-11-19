<template>
  <div class="card">
    <h2 class="title">Tasks</h2>

    <!-- Loading state -->
    <div v-if="store.loading">Loading...</div>

    <!-- No tasks state -->
    <div v-else-if="store.tasks.length === 0" class="no-tasks">
      No tasks found
    </div>

    <!-- Task list -->
    <div
      v-else
      v-for="task in store.tasks"
      :key="task.id"
      class="task-item"
    >
      <span :class="['task-title', task.isCompleted ? 'completed' : '']">
        {{ task.title }}
      </span>

      <div style="display:flex; gap:10px;">
        <button class="icon-btn edit" @click="$emit('edit', task)">Edit</button>
        <button class="icon-btn delete" @click="store.deleteTask(task.id)">Delete</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTodoStore } from "../stores/todoStore";
import type { ITodoTask } from "../types/ITodoTask";

defineEmits<{ (e: "edit", task: ITodoTask): void }>();
const store = useTodoStore();
</script>

