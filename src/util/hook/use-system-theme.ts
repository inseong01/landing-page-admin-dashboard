import { useEffect, useState } from "react";

export function useSystemTheme() {
  const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [theme, setTheme] = useState(isDarkMode ? "dark" : "light");

  /* 색상테마 감지 */
  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)",
    );

    function handleDarkModeChange(event: MediaQueryListEvent) {
      setTheme(event.matches ? "dark" : "light");
    }

    darkModeMediaQuery.addEventListener("change", handleDarkModeChange);

    return () => {
      darkModeMediaQuery.removeEventListener("change", handleDarkModeChange);
    };
  }, []);

  return theme;
}
