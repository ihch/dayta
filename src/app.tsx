import { useState } from "preact/hooks";

import { css } from "../styled-system/css";
import { flex } from "../styled-system/patterns";

import { SubmitButton } from "./BaseButton";
import { Heading2 } from "./Heading2";
import { NavigationBar } from "./NavigationBar";
import { TaskForm } from "./TaskForm";
import { TaskList, useTasks } from "./TaskList";
import { TextInput } from "./TextInput";

export function App() {
  const { tasks, push } = useTasks([{ id: "AB02EF", name: "タスク1" }]);
  const [inputTaskName, setInputTaskName] = useState("");

  return (
    <>
      <NavigationBar name="Dayta" logoSrc="/sushi_icon.png" logoAlt="Dayta" />
      <div className={css({ py: 6, px: 12 })}>
        <TaskForm
          onSubmit={(e) => {
            push({ id: "", name: inputTaskName });
            setInputTaskName("");
            e.preventDefault();
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
            <TaskList tasks={tasks} />
          </div>
        </div>
      </div>
    </>
  );
}
