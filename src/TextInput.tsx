import { JSX } from "preact/jsx-runtime";
import { css } from "../styled-system/css";

export function TextInput(props: JSX.IntrinsicElements["input"]) {
  return (
    <input
      {...props}
      type="text"
      className={css({
        height: 10,
        width: 300,
        paddingX: 2,
        borderColor: "gray.300",
        borderWidth: 2,
        borderStyle: "solid",
      })}
    />
  );
}
