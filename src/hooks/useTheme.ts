import { useState, useCallback } from "react"

import { themeDefault, themeDark } from "@/constants"

import type { ThemeName } from "@/types/theme"

export const useTheme = (): [ThemeName, () => void] => {
  const localTheme = localStorage.getItem("theme") || themeDefault

  const [theme, setTheme] = useState(localTheme as ThemeName)

  const toggleTheme = useCallback(() => {
    const newTheme = theme === themeDark ? themeDefault : themeDark

    setTheme(newTheme as ThemeName)

    localStorage.setItem("theme", newTheme)
  }, [setTheme, theme])

  return [theme, toggleTheme]
}
