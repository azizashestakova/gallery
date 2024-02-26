import { Dispatch, FC, SetStateAction } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { ReactSVG } from "react-svg"
import cn from "classnames/bind"

import { useBreakpoints } from "@consta/uikit/useBreakpoints"

import { Layout } from "@consta/header/Layout"

import { HeaderDesktop } from "@/components/Header/HeaderDesktop"
import { HeaderMobile } from "@/components/Header/HeaderMobile"

import LogoIcon from "@/assets/logo.svg"

import { useAppDispatch, useAppSelector } from "@/app/hooks"

import { selectIsAuthenticated } from "@/features/auth/authSlice"

import { removeAuth } from "@/features/auth/authSlice"

import type { ThemeName } from "@/types/theme"

import { menu } from "./constants"

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

  const navigate = useNavigate()
  const location = useLocation()

  const dispatch = useAppDispatch()

  const logOut = () => {
    dispatch(removeAuth())
  }

  const isAuthenticated = useAppSelector(selectIsAuthenticated)

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
          <HeaderDesktop
            theme={theme}
            setTheme={setTheme}
            items={menu(navigate, location, logOut, isAuthenticated)}
          />
        ) : (
          <HeaderMobile
            theme={theme}
            setTheme={setTheme}
            items={menu(navigate, location, logOut, isAuthenticated)}
          />
        ),
      }}
      placeholder={undefined}
    />
  )
}
