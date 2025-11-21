import { defineStore } from "pinia";
import { ref } from "vue";
import * as todoApi from "@/api/todoApi";
import type { ITodoTask } from "@/types/ITodoTask";

export const useTodoStore = defineStore("todo", () => {
  const tasks = ref<ITodoTask[]>([]);
  const loading = ref(false);

  async function load() {
    loading.value = true;
    try {
      const res = await todoApi.getTasks();
      tasks.value = res.data;
    } finally { loading.value = false; }
  }

  async function add(task: Partial<ITodoTask>) {
    await todoApi.addTask(task);
    await load();
  }

  async function update(id: number, payload: Partial<ITodoTask>) {
    await todoApi.updateTask(id, payload);
    await load();
  }

  async function toggle(id: number) {
    await todoApi.toggleTask(id);
    await load();
  }

  async function remove(id: number) {
    await todoApi.deleteTask(id);
    await load();
  }

  return { tasks, loading, load, add, update, toggle, remove };
});
