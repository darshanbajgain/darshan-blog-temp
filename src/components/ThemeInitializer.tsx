'use client'

import { useEffect } from 'react'
import { useTheme } from 'next-themes'

export function ThemeInitializer() {
  const { setTheme } = useTheme()

  // Initialize theme on client-side
  useEffect(() => {
    try {
      // Check if there's a saved theme preference in localStorage
      const savedTheme = localStorage.getItem('theme')

      // Apply the saved theme or default to light
      if (savedTheme === 'dark') {
        setTheme('dark')
      } else {
        // Always default to light theme if not explicitly set to dark
        setTheme('light')
        // If no theme was previously set, save the preference
        if (!savedTheme) {
          localStorage.setItem('theme', 'light')
        }
      }
    } catch (e) {
      // Fallback if localStorage is not available
      setTheme('light')
    }
  }, [setTheme])

  // This component doesn't render anything
  return null
}
