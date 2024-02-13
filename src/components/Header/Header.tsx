import { Dispatch, FC, SetStateAction } from "react"
import { Link } from "react-router-dom"
import { ReactSVG } from "react-svg"
import cn from "classnames/bind"

import { useBreakpoints } from "@consta/uikit/useBreakpoints"

import { Layout } from "@consta/header/Layout"

import { HeaderDesktop } from "@/components/Header/HeaderDesktop"
import { HeaderMobile } from "@/components/Header/HeaderMobile"

import LogoIcon from "@/assets/logo.svg"

import type { ThemeName } from "@/types/theme"

import styles from "./Header.module.css"

const cx = cn.bind(styles)

interface HeaderProps {
  theme: ThemeName
  setTheme: Dispatch<SetStateAction<ThemeName>>
}

export const Header: FC<HeaderProps> = ({ theme, setTheme }) => {
  const breakpoints = useBreakpoints({
    map: { l: 768 },
    isActive: true,
  })

  return (
    <Layout
      className={cx("header")}
      rowCenter={{
        left: (
          <Link to="/">
            <ReactSVG src={LogoIcon} className={cx("logo")} />
          </Link>
        ),
        center: undefined,
        right: breakpoints.l ? (
          <HeaderDesktop theme={theme} setTheme={setTheme} />
        ) : (
          <HeaderMobile theme={theme} setTheme={setTheme} />
        ),
      }}
      placeholder={undefined}
    />
  )
}
