import axios from "axios";
import type { ITodoTask } from "@/types/ITodoTask";


// Load URL from .env (VITE_API_BASE_URL)
let baseUrl = import.meta.env.VITE_API_BASE_URL as string;

// Remove trailing slash if present
if (baseUrl.endsWith("/")) {
  baseUrl = baseUrl.slice(0, -1);
}
const api = axios.create({
  baseURL: baseUrl,
});

// CRUD operations with TypeScript types
const todoApi = {
  getTasks() {
    return api.get<ITodoTask[]>("/todos");
  },

  getTask(id: number) {
    return api.get<ITodoTask>(`/todos/${id}`);
  },

  addTask(task: ITodoTask) {
    return api.post("/todos", task);
  },

  updateTask(id: number, task: ITodoTask) {
    return api.put(`/todos/${id}`, task);
  },

  deleteTask(id: number) {
    return api.delete(`/todos/${id}`);
  },
};

export default todoApi;