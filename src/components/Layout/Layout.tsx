import { FC } from "react"
import cn from "classnames/bind"
import { Outlet } from "react-router-dom"

import { Layout as LayoutConsta } from "@consta/uikit/Layout"
import { Theme } from "@consta/uikit/Theme"

import { Header } from "@/components/Header"
import { ScrrollToTop } from "@/components/ScrrollToTop"
import { SnackBar } from "@/components/Snackbar"
import { useTheme } from "@/hooks/useTheme"
import { getPreset } from "@/utils/getPreset"

import styles from "./Layout.module.scss"

const cx = cn.bind(styles)

export const Layout: FC = () => {
  const [theme, toggleTheme] = useTheme()

  return (
    <Theme preset={getPreset(theme)} className={cx("container")}>
      <Header theme={theme} setTheme={toggleTheme} />
      <LayoutConsta className={cx("layout")} as="main">
        <Outlet />
        <ScrrollToTop />
        <SnackBar />
      </LayoutConsta>
    </Theme>
  )
}
