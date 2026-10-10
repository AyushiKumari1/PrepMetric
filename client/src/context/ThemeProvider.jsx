import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { ThemeContext } from "./themeContext";

function readSavedTheme() {
    try {
        const storedTheme = window.localStorage.getItem("prepmetric-theme");
        return storedTheme === "light" || storedTheme === "dark" ? storedTheme : "dark";
    } catch {
        return "dark";
    }
}

function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(readSavedTheme);

    useLayoutEffect(() => {
        document.documentElement.dataset.resumeTheme = theme;
        document.documentElement.style.colorScheme = theme;
        try {
            window.localStorage.setItem("prepmetric-theme", theme);
        } catch {
            // Theme remains functional for this session when storage is unavailable.
        }
    }, [theme]);

    useEffect(() => {
        const syncThemeFromStorage = (event) => {
            if (event.key === "prepmetric-theme" && (event.newValue === "light" || event.newValue === "dark")) {
                setTheme(event.newValue);
            }
        };
        window.addEventListener("storage", syncThemeFromStorage);
        return () => window.removeEventListener("storage", syncThemeFromStorage);
    }, []);

    const value = useMemo(() => ({
        theme,
        setTheme: (nextTheme) => {
            if (nextTheme === "light" || nextTheme === "dark") setTheme(nextTheme);
        },
        toggleTheme: () => setTheme((current) => current === "dark" ? "light" : "dark"),
    }), [theme]);

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export default ThemeProvider;
