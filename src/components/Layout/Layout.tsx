import { FC } from "react"
import { Outlet } from "react-router-dom"
import cn from "classnames/bind"

import { Theme } from "@consta/uikit/Theme"
import { Layout as LayoutConsta } from "@consta/uikit/Layout"

import { Header } from "@/components/Header"
import { ScrrollToTop } from "@/components/ScrrollToTop"

import { getPreset } from "@/utils/getPreset"

import { useTheme } from "@/hooks/useTheme"

import styles from "./Layout.module.css"

const cx = cn.bind(styles)

export const Layout: FC = () => {
  const [theme, toggleTheme] = useTheme()

  return (
    <Theme preset={getPreset(theme)} className={cx("container")}>
      <Header theme={theme} setTheme={toggleTheme} />
      <LayoutConsta className={cx("layout")} as="main">
        <Outlet />
        <ScrrollToTop />
      </LayoutConsta>
    </Theme>
  )
}
