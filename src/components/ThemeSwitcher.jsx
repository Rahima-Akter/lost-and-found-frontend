import React, { useState, useEffect } from "react";
import { BsMoonStars } from "react-icons/bs";
import { IoSunny } from "react-icons/io5";

const ThemeSwitcher = () => {
    const [theme, setTheme] = useState(
        localStorage.getItem("theme") || "light"
    );

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    return (
        <button onClick={toggleTheme}>
            <input type="checkbox" className="toggle toggle-info" defaultChecked />
        </button>
    );
};

export default ThemeSwitcher;
