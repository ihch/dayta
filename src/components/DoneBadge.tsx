import { css } from "@styles/styled-system/css";

export function DoneBadge({ isDone }: { isDone: boolean }) {
  const style = css({
    width: 6,
    height: 6,
    padding: 1,
    borderRadius: "50%",
    color: "white",
    backgroundColor: isDone ? "green.400" : "gray.400",
  });

  return (
    <svg
      className={style}
      xmlns="http://www.w3.org/2000/svg"
      height="48"
      viewBox="0 -960 960 960"
      width="48"
      fill="currentColor"
    >
      <path d="M378-246 154-470l43-43 181 181 384-384 43 43-427 427Z" />
    </svg>
  );
}
