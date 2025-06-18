import { createContext } from "react";

const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
export const ThemeContext = createContext(isDarkMode ? "dark" : "light");
