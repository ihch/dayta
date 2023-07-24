import { useState } from "preact/hooks";
import { css } from "../styled-system/css";

type TaskProps = {
  id: string;
  name: string;
};

export function useTasks(defaultValue: TaskProps[] = []) {
  const [tasks, setTasks] = useState<TaskProps[]>(defaultValue);
  const push = (task: TaskProps) => setTasks([...tasks, task]);

  return { tasks, push };
}

function TaskListElement({ task }: { task: TaskProps }) {
  return <li className={css({ mt: 2, color: "gray.800" })}>{task.name}</li>;
}

export function TaskList({ tasks }: { tasks: TaskProps[] }) {
  return (
    <ul>
      {tasks.map((task: TaskProps) => (
        <TaskListElement key={task.id} task={task} />
      ))}
    </ul>
  );
}
