import { useState } from "preact/hooks";

import { css } from "@styles/styled-system/css";
import { flex } from "@styles/styled-system/patterns";

import { SubmitButton } from "~/components/BaseButton";
import { Heading2 } from "./components/Heading2";
import { NavigationBar } from "./components/NavigationBar";
import { TaskForm } from "./components/TaskForm";
import { TaskList, useTasks } from "./components/TaskList";
import { TextInput } from "./components/TextInput";

function generateUUID() {
  // https://developer.mozilla.org/ja/docs/Web/API/Crypto/randomUUID
  return self.crypto.randomUUID();
}

export function App() {
  const { tasks, push, toggleTaskState, changeTaskOrder } = useTasks();
  const [inputTaskName, setInputTaskName] = useState("");

  return (
    <>
      <NavigationBar name="Dayta" logoSrc="/sushi_icon.png" logoAlt="Dayta" />
      <main className={css({ py: 6, px: 12 })}>
        <TaskForm
          onSubmit={(e) => {
            e.preventDefault();
            if (inputTaskName === "") {
              return;
            }
            push({ id: generateUUID(), name: inputTaskName, isDone: false });
            setInputTaskName("");
          }}
        >
          <Heading2 title="新しいタスク" />
          <div className={flex({ direction: "row" })}>
            <TextInput
              value={inputTaskName}
              onInput={(e) => {
                const value = e.currentTarget.value;
                value && setInputTaskName(value);
              }}
            />
            <SubmitButton text="作成" />
          </div>
        </TaskForm>
        <div className={css({ mt: 4 })}>
          <Heading2 title="毎日のタスク" />
          <div className={css({ mt: 2 })}>
            <TaskList tasks={tasks} toggleTaskState={toggleTaskState} changeTaskOrder={changeTaskOrder} />
          </div>
        </div>
      </main>
    </>
  );
}
