<template>
  <div>
    <TaskForm
      :modelValue="selectedTask"
      @reset="selectedTask = null"
    />

    <TaskList @edit="selectTask" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useTodoStore } from "../stores/todoStore";
import TaskList from "../components/TaskList.vue";
import TaskForm from "../components/TaskForm.vue";
import type { ITodoTask } from "../types/ITodoTask";

// Store
const store = useTodoStore();

// selectedTask typed as TodoTask or null
const selectedTask = ref<ITodoTask | null>(null);

// Load tasks on mount
onMounted(() => {
  store.loadTasks();
});

// Function parameter typed
function selectTask(task: ITodoTask) {
  selectedTask.value = task;
}
</script>
