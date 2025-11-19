import { defineStore } from "pinia";
import todoApi from "../api/todoApi";
import type { ITodoTask } from "@/types/ITodoTask";

export const useTodoStore = defineStore("todoStore", {
  state: () => ({
    tasks: [] as ITodoTask[],
    loading: false as boolean,
  }),

  actions: {
    async loadTasks(): Promise<void> {
      this.loading = true;
      const { data } = await todoApi.getTasks();
      this.tasks = data;
      this.loading = false;
    },

    async addTask(task: ITodoTask): Promise<void> {
      await todoApi.addTask(task);
      await this.loadTasks();
    },

    async updateTask(id: number, task: ITodoTask): Promise<void> {
      await todoApi.updateTask(id, task);
      await this.loadTasks();
    },

    async deleteTask(id: number): Promise<void> {
      await todoApi.deleteTask(id);
      await this.loadTasks();
    }
  },
});
