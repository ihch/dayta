import { css } from "@styles/styled-system/css";
import { flex } from "@styles/styled-system/patterns";

export function NavigationBar({ name, logoSrc, logoAlt }: { name: string; logoSrc: string; logoAlt: string }) {
  return (
    <div className={css({ position: "sticky", top: 0, zIndex: "auto", width: "full" })}>
      <nav
        className={flex({
          direction: "row",
          alignItems: "center",
          paddingY: 1,
          paddingX: 6,
          borderBottomColor: "gray.300",
          borderBottomWidth: 1,
          borderBottomStyle: "solid",
        })}
      >
        <img src={logoSrc} alt={logoAlt} className={css({ width: 8, height: 8, mr: 2, borderRadius: "50%" })} />
        <h1 className={css({ fontSize: "xx-large", fontWeight: "bold", color: "gray.800" })}>{name}</h1>
      </nav>
    </div>
  );
}
