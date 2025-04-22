"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useEffect, useState } from "react";

/**
 * Clean theme provider component that handles dark/light mode
 * - Uses 'light' as the default theme
 * - Handles hydration correctly
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
    // Track if component is mounted to prevent hydration mismatch
    const [mounted, setMounted] = useState(false);

    // Set mounted state after initial render
    useEffect(() => {
        setMounted(true);
    }, []);

    // During SSR and initial render, just render children without theme context
    // This prevents hydration mismatch
    if (!mounted) {
        return <>{children}</>;
    }

    return (
        <NextThemesProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            storageKey="theme"
        >
            {children}
        </NextThemesProvider>
    );
}