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
  const toggleTaskState = (taskId: TaskProps["id"]) => {
    setTasks((prevTasks) => {
      const newTasks = prevTasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, isDone: !task.isDone };
        }
        return task;
      });

      return newTasks;
    });
  };

  return { tasks, push, toggleTaskState };
}

function TaskListElement({
  task,
  toggleTaskStatus,
}: {
  task: TaskProps;
  // eslint-disable-next-line no-unused-vars
  toggleTaskStatus: (taskId: TaskProps["id"]) => void;
}) {
  return (
    <li>
      <a className={flex({ gap: 2, mt: 2, color: "gray.800" })} onClick={() => toggleTaskStatus(task.id)}>
        <span className={css({ mr: 2 })}>{task.name}</span>
        <DoneBadge isDone={task.isDone} />
      </a>
    </li>
  );
}

export function TaskList({
  tasks,
  toggleTaskState,
}: {
  tasks: TaskProps[];
  // eslint-disable-next-line no-unused-vars
  toggleTaskState: (taskId: TaskProps["id"]) => void;
}) {
  return (
    <ul>
      {tasks.map((task: TaskProps) => (
        <TaskListElement key={task.id} task={task} toggleTaskStatus={toggleTaskState} />
      ))}
    </ul>
  );
}
