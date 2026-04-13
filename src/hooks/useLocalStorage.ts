import { useState, useEffect } from "react"

// Custom hook to manage state that persists in localStorage
export function useLocalStorage<T>(key: string, initialValue: T) {
  // Initialize state by checking localStorage first
  const [value, setValue] = useState<T>(() => {
    const stored = localStorage.getItem(key)
    // If a stored value exists, parse it, otherwise use the initial value
    return stored ? JSON.parse(stored) : initialValue
  })

  // Update localStorage whenever the value changes
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  // Return state and setter (as a tuple, like useState)
  return [value, setValue] as const
}