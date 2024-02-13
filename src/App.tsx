import { cn } from "@bem-react/classname"

import { Theme } from "@consta/uikit/Theme"
import { Layout } from "@consta/uikit/Layout"

import { Header } from "@/components/Header"
import { Artists } from "@/components/Artists/Artists"

import { getPreset } from "@/utils/getPreset"

import { useTheme } from "@/hooks/useTheme"

import "./App.css"

const cnRootTheme = cn("RootTheme")

export const App = () => {
  const [theme, toggleTheme] = useTheme()

  return (
    <Theme preset={getPreset(theme)} className={cnRootTheme()}>
      <div className="app">
        <Header theme={theme} setTheme={toggleTheme} />
        <Layout className="layout">
          <Artists />
        </Layout>
      </div>
    </Theme>
  )
}
