import { TaskProps } from "./components/TaskList";

class NoWindowObjectError extends Error {
  constructor() {
    const errorMessage = "Window object is undefined.";
    super(errorMessage);
  }
}

export const saveTasksToStorage = (tasks: TaskProps[]): void => {
  if (!window) {
    throw new NoWindowObjectError();
  }
  window.localStorage.setItem("tasks", JSON.stringify({ tasks }));
};

export const getTasksFromStorage = (): TaskProps[] => {
  if (!window) {
    throw new NoWindowObjectError();
  }
  const tasksString = window.localStorage.getItem("tasks") || "[]";
  const tasks = JSON.parse(tasksString);
  return tasks;
};
