import { RefObject, useCallback, useEffect, useState } from "react";
import { event } from "lib/analytics";

/**
 * - localStorage is used to persist the theme across reloads
 * - ref.current.checked is used to change switch UI
 * - theme state is used to display appropriate label in parent
 *
 * @param ref - controls `checked` property
 * @returns {toggle, isDarkmode}
 */

function useToggleDarkmode(ref: RefObject<HTMLInputElement>) {
  const [theme, setTheme] = useState<"light" | "dark" | "">("light");

  useEffect(() => {
    if (localStorage.theme) {
      setTheme(localStorage.theme);
      if (ref.current) ref.current.checked = localStorage.theme === "light";
      return document.documentElement.classList.add(localStorage.theme);
    } else {
      localStorage.theme = "light";
      return document.documentElement.classList.add("light");
    }
  }, [ref]);

  const toggle = useCallback(() => {
    const html = document.getElementsByTagName("html")[0];
    const theme = html.className === ("dark" || "") ? "light" : "dark";
    setTheme(theme);
    localStorage.theme = theme;
    html.className = theme;

    /* GA */
    event({
      action: "toggle_darkmode",
      params: {
        preferredTheme: theme,
      },
    });
  }, []);

  return { toggle, isDarkmode: theme === "dark" };
}

export default useToggleDarkmode;
