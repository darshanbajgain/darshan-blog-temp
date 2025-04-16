'use client'

import { useEffect } from 'react'

// This component injects a script into the head to prevent flash of wrong theme
export function ThemeScript() {
  useEffect(() => {
    // This script runs on the client side only
    const setInitialTheme = () => {
      // Set dark theme as default
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    }

    setInitialTheme()
  }, [])

  return null
}

// This component provides a script tag that runs before React hydration
export function ThemeScriptTag() {
  // This script runs immediately on page load, before any React code
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            // Set dark theme as default
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
          })();
        `,
      }}
    />
  )
}
