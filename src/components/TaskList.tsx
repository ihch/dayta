import { useState } from "preact/hooks";
import { flex } from "@styles/patterns";
import { DoneBadge } from "~/components/DoneBadge";
import { css } from "@styles/css";

type TaskProps = {
  id: string;
  name: string;
  isDone: boolean;
};

export function useTasks(defaultValue: TaskProps[] = []) {
  const [tasks, setTasks] = useState<TaskProps[]>(defaultValue);
  const push = (task: TaskProps) => setTasks([...tasks, task]);

  return { tasks, push };
}

function TaskListElement({ task }: { task: TaskProps }) {
  return (
    <li className={flex({ gap: 2, mt: 2, color: "gray.800" })}>
      <span className={css({ mr: 2 })}>{task.name}</span>
      <DoneBadge isDone={task.isDone} />
    </li>
  );
}

export function TaskList({ tasks }: { tasks: TaskProps[] }) {
  console.log(tasks);
  return (
    <ul>
      {tasks.map((task: TaskProps) => (
        <TaskListElement key={task.id} task={task} />
      ))}
    </ul>
  );
}
