import { useState, useCallback } from "react"

import { ThemeName } from "@/types/theme"

export const useTheme = (): [ThemeName, () => void] => {
  const localTheme = localStorage.getItem("theme") || "gpnDefault"
  const [theme, setTheme] = useState(localTheme as ThemeName)

  const toggleTheme = useCallback(() => {
    const newTheme = theme === "gpnDark" ? "gpnDefault" : "gpnDark"
    setTheme(newTheme as ThemeName)
    localStorage.setItem("theme", newTheme)
  }, [setTheme, theme])

  return [theme, toggleTheme]
}
