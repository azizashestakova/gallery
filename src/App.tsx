import { cn } from "@bem-react/classname"

import { Theme } from "@consta/uikit/Theme"
import { Layout } from "@consta/uikit/Layout"
import { cnMixSpace } from "@consta/uikit/MixSpace"

import { Header } from "@/features/header/Header"
import { Products } from "@/features/products/Products"

import { getPreset } from "@/utils/getPreset"

import { useTheme } from "@/hooks/useTheme"

import "./App.css"

const cnRootTheme = cn("RootTheme")

export const App = () => {
  const [theme, toggleTheme] = useTheme()

  return (
    <Theme preset={getPreset(theme)} className={cnRootTheme()}>
      <div className="App">
        <Header theme={theme} setTheme={toggleTheme} />
        <Layout className="layout">
          <Products />
        </Layout>
      </div>
    </Theme>
  )
}
