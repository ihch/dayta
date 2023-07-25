import { css } from "@styles/css";

export function Heading2({ title }: { title: string }) {
  return <h2 className={css({ fontSize: "x-large", fontWeight: "bold", color: "gray.600" })}>{title}</h2>;
}
