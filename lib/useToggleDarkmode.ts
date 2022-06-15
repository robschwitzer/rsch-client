import { useCallback, useEffect } from "react";

function useToggleDarkmode() {
  useEffect(() => {
    // TODO: refactor this to be more declarative, dont like accessing dom elements like this
    const switchEl = document.getElementById(
      "darkmode-switch"
    ) as HTMLInputElement;

    if (localStorage.theme) {
      if (switchEl) {
        switchEl.checked = localStorage.theme === "light";
      }
      return document.documentElement.classList.add(localStorage.theme);
    } else {
      localStorage.theme = "dark";
      return document.documentElement.classList.add("dark")
    }
  }, []);

  const toggle = useCallback(() => {
    const html = document.getElementsByTagName("html")[0];
    const className = html.className === ("dark" || "") ? "light" : "dark";
    localStorage.theme = className;
    html.className = className;
  }, []);

  return { toggle };
}

export default useToggleDarkmode;
