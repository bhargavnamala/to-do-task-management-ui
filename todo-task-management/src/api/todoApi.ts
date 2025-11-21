import api from "./api";
import type { ITodoTask } from "@/types/ITodoTask";

export function getTasks() { return api.get<ITodoTask[]>("/todos"); }
export function getTask(id: number) { return api.get<ITodoTask>(`/todos/${id}`); }
export function addTask(task: Partial<ITodoTask>) { return api.post("/todos", task); }
export function updateTask(id: number, task: Partial<ITodoTask>) { return api.put(`/todos/${id}`, task); }
export function toggleTask(id: number) { return api.patch(`/todos/${id}/toggle`); }
export function deleteTask(id: number) { return api.delete(`/todos/${id}`); }