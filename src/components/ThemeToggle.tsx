'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'

/**
 * A clean theme toggle button component
 * - Toggles between light and dark mode
 * - Shows appropriate icon based on current theme
 * - Handles hydration correctly
 */
export function ThemeToggle() {
  // Track if component is mounted to prevent hydration mismatch
  const [mounted, setMounted] = useState(false)
  
  // Get theme functions from next-themes
  const { theme, setTheme } = useTheme()
  
  // Set mounted state after initial render
  useEffect(() => {
    setMounted(true)
  }, [])
  
  // Function to toggle theme
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }
  
  // Don't render anything until mounted to prevent hydration mismatch
  if (!mounted) return null
  
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      className="text-buttons hover:text-buttons hover:bg-buttons/5"
    >
      {theme === 'dark' ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </Button>
  )
}
