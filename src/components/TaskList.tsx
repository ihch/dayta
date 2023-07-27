import { ComponentChildren } from "preact";
import { useState } from "preact/hooks";
import { css } from "@styles/styled-system/css";
import { flex } from "@styles/styled-system/patterns";
import { DoneBadge } from "~/components/DoneBadge";
import { getTasksFromStorage, saveTasksToStorage } from "~/storage";

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

export type TaskProps = {
  id: string;
  name: string;
  isDone: boolean;
};

export function useTasks(defaultValue: TaskProps[] = []) {
  const initialValue = defaultValue.length === 0 ? getTasksFromStorage() : defaultValue;
  const [tasks, setTasks] = useState<TaskProps[]>(initialValue);

  const push = (task: TaskProps) => {
    const newTasks = [...tasks, task];
    setTasks(newTasks);
    saveTasksToStorage(newTasks);
  };

  const toggleTaskState = (taskId: TaskProps["id"]) => {
    setTasks((prevTasks) => {
      const newTasks = prevTasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, isDone: !task.isDone };
        }
        return task;
      });

      saveTasksToStorage(newTasks);
      return newTasks;
    });
  };

  const changeTaskOrder = (targetIndex: number, to: number) => {
    const newTasks = [...tasks];
    newTasks.splice(targetIndex, 1);
    newTasks.splice(to, 0, tasks[targetIndex]);

    setTasks(newTasks);
    saveTasksToStorage(newTasks);
  };

  // TODO: 作成済みのタスクの削除機能

  return { tasks, push, toggleTaskState, setTasks, changeTaskOrder };
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
          _hover: { cursor: "pointer", borderColor: "blue.600", borderWidth: 2 },
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
  changeTaskOrder,
}: {
  tasks: TaskProps[];
  // eslint-disable-next-line no-unused-vars
  toggleTaskState: UseTasksReturnType["toggleTaskState"];
  // eslint-disable-next-line no-unused-vars
  changeTaskOrder: UseTasksReturnType["changeTaskOrder"];
}) {
  const [draggingIndex, setDraggingIndex] = useState(0);
  return (
    <ul>
      {tasks.map((task: TaskProps, index) => (
        <DraggableElement
          key={task.id}
          onDragStart={() => setDraggingIndex(index)}
          onDrop={() => changeTaskOrder(draggingIndex, index)}
        >
          <TaskListElement task={task} toggleTaskStatus={toggleTaskState} />
        </DraggableElement>
      ))}
    </ul>
  );
}
