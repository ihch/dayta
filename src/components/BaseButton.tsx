import { JSX } from "preact/jsx-runtime";
import { css } from "@styles/styled-system/css";

export function SubmitButton({ text, ...props }: JSX.IntrinsicElements["button"] & { text: string }) {
  return (
    <BaseButton
      {...props}
      type="submit"
      className={css({
        ml: 2,
        px: 4,
        fontWeight: "bold",
        color: "white",
        bg: "blue.400",
        borderRadius: 10,
        _hover: { cursor: "pointer", bg: "blue.300" },
      })}
      text={text}
    />
  );
}

export function BaseButton({ text, ...props }: JSX.IntrinsicElements["button"] & { text: string }) {
  return <button {...props}>{text}</button>;
}
