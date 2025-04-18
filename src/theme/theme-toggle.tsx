"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
    const { setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Fix hydration issue
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null; // Avoids hydration mismatch on SSR
    }

    return (
        <button
            className="fixed bottom-4 right-4 p-2 bg-buttons text-textPrimary rounded"
             onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
        >
            {resolvedTheme === "dark" ? "Light Mode" : "Dark Mode"}
        </button>
    );
}
