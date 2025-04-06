import { create } from "zustand";
import { Task } from "../types/TaskTypes";

interface TaskStore {
  taskList: Task[];
  setTaskList: (tasks: Task[]) => void;
  addTask: (task: Task) => void;
  updateTask: (updatedTask: Task) => void;
  removeTask: (id: number) => void;
  toggleTaskStatus: (id: number) => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
  taskList: [],
  setTaskList: (tasks) => set({ taskList: tasks }),
  addTask: (task) => set((state) => ({ taskList: [...state.taskList, task] })),
  updateTask: (updatedTask) =>
    set((state) => ({
      taskList: state.taskList.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      ),
    })),
  removeTask: (id) =>
    set((state) => ({
      taskList: state.taskList.filter((task) => task.id !== id),
    })),
  toggleTaskStatus: (id) =>
    set((state) => ({
      taskList: state.taskList.map((task) =>
        task.id === id
          ? {
              ...task,
              status: task.status === "Completed" ? "Pending" : "Completed",
            }
          : task
      ),
    })),
}));
