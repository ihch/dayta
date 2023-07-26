import { useState } from "preact/hooks";

import { css } from "@styles/css";
import { flex } from "@styles/patterns";

import { SubmitButton } from "~/components/BaseButton";
import { Heading2 } from "./components/Heading2";
import { NavigationBar } from "./components/NavigationBar";
import { TaskForm } from "./components/TaskForm";
import { TaskList, useTasks } from "./components/TaskList";
import { TextInput } from "./components/TextInput";

export function App() {
  const { tasks, push } = useTasks([{ id: "AB02EF", name: "タスク1" }]);
  const [inputTaskName, setInputTaskName] = useState("");

  return (
    <>
      <NavigationBar name="Dayta" logoSrc="/sushi_icon.png" logoAlt="Dayta" />
      <div className={css({ py: 6, px: 12 })}>
        <TaskForm
          onSubmit={(e) => {
            e.preventDefault();
            push({ id: "", name: inputTaskName });
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
            <TaskList tasks={tasks} />
          </div>
        </div>
      </div>
    </>
  );
}
