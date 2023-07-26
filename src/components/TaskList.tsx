import { ComponentChildren } from "preact";
import { useState } from "preact/hooks";
import { css } from "@styles/css";
import { flex } from "@styles/patterns";
import { DoneBadge } from "~/components/DoneBadge";

function DraggableElement({
  children,
  onDragStart,
  onDrop,
}: {
  children: ComponentChildren;
  onDragStart: () => void;
  // eslint-disable-next-line no-unused-vars
  onDrop: (e: DragEvent) => void;
}) {
  return (
    <div draggable onDragStart={() => onDragStart()} onDrop={(e) => onDrop(e)} onDragOver={(e) => e.preventDefault()}>
      {children}
    </div>
  );
}

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

  return { tasks, push, toggleTaskState, setTasks };
}

type UseTasksReturnType = ReturnType<typeof useTasks>;

function TaskListElement({
  task,
  toggleTaskStatus,
}: {
  task: TaskProps;
  // eslint-disable-next-line no-unused-vars
  toggleTaskStatus: (taskId: TaskProps["id"]) => void;
}) {
  return (
    <li className={css({ maxWidth: 300 })}>
      <a
        className={flex({
          justifyContent: "space-between",
          mt: 2,
          padding: 2,
          color: "gray.800",
          borderStyle: "solid",
          borderColor: "gray.400",
          borderWidth: 1,
          borderRadius: "sm",
        })}
        onClick={() => toggleTaskStatus(task.id)}
      >
        <span>{task.name}</span>
        <DoneBadge isDone={task.isDone} />
      </a>
    </li>
  );
}

export function TaskList({
  tasks,
  toggleTaskState,
  setTasks,
}: {
  tasks: TaskProps[];
  // eslint-disable-next-line no-unused-vars
  toggleTaskState: UseTasksReturnType["toggleTaskState"];
  // eslint-disable-next-line no-unused-vars
  setTasks: UseTasksReturnType["setTasks"];
}) {
  const [draggingIndex, setDraggingIndex] = useState(0);
  return (
    <ul>
      {tasks.map((task: TaskProps, index) => (
        <DraggableElement
          key={task.id}
          onDragStart={() => setDraggingIndex(index)}
          onDrop={() => {
            const newTasks = [...tasks];
            newTasks.splice(draggingIndex, 1);
            newTasks.splice(index, 0, tasks[draggingIndex]);
            setTasks(newTasks);
          }}
        >
          <TaskListElement task={task} toggleTaskStatus={toggleTaskState} />
        </DraggableElement>
      ))}
    </ul>
  );
}
