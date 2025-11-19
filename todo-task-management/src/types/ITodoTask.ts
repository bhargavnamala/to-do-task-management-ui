// Define Task interface matching your .NET model
export interface ITodoTask {
  id: number;
  title: string;
  description?: string;
  isCompleted: boolean;
}