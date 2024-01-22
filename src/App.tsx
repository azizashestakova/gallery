import { useState } from "react"
import { cn } from "@bem-react/classname"

import { Theme } from "@consta/uikit/Theme"

import { Header } from "./features/header/Header"

import { getPreset } from "./utils/getPreset"

import type { ThemeName } from "./types/theme"

import "./App.css"

const cnRootTheme = cn("RootTheme")

export const App = () => {
  const [theme, setTheme] = useState<ThemeName>("gpnDefault")

  return (
    <Theme preset={getPreset(theme)} className={cnRootTheme()}>
      <div className="App">
        <Header theme={theme} setTheme={setTheme} />
      </div>
    </Theme>
  )
}
