import { Dispatch, FC, SetStateAction, useEffect, useState } from "react"
import cn from "classnames/bind"
import { Link, useLocation } from "react-router-dom"
import { ReactSVG } from "react-svg"

import { Layout } from "@consta/header/Layout"
import { useBreakpoints } from "@consta/uikit/useBreakpoints"

import { useAppDispatch, useAppSelector } from "@/app/hooks"
import LogoIcon from "@/assets/logo.svg"
import { HeaderDesktop } from "@/components/Header/HeaderDesktop"
import { HeaderMobile } from "@/components/Header/HeaderMobile"
import { Login } from "@/components/Login"
import { Register } from "@/components/Register"
import { SearchMobile } from "@/components/SearchMobile"
import { limit } from "@/constants"
import { selectIsAuthenticated, loggedOut } from "@/features/auth/authSlice"
import { useOutsideClick } from "@/hooks/useOutsideClick"

import type { ThemeName } from "@/types/theme"

import styles from "./Header.module.scss"
import { menu } from "./helpers"

const cx = cn.bind(styles)

interface HeaderProps {
  theme: ThemeName
  setTheme: Dispatch<SetStateAction<ThemeName>>
}

export const Header: FC<HeaderProps> = ({ theme, setTheme }) => {
  const { ref, isComponentVisible, setIsComponentVisible } =
    useOutsideClick(false)

  const breakpoints = useBreakpoints({
    map: { m: 768 },
    isActive: true,
  })

  const location = useLocation()

  const dispatch = useAppDispatch()

  const logOut = () => {
    dispatch(loggedOut())
  }

  const isAuthenticated = useAppSelector(selectIsAuthenticated)

  const [modalActive, setModalActive] = useState("")

  useEffect(() => {
    document.body.style.overflow = !!modalActive ? "hidden" : "unset"
  }, [modalActive])

  return (
    <header className={cx("header")}>
      <Layout
        className={cx("wrapper", { "wrapper-search": isComponentVisible })}
        rowCenter={{
          left: !isComponentVisible ? (
            <Link to={`/?perPage=${limit}&pageNumber=1`} className={cx("logo")}>
              <ReactSVG src={LogoIcon} />
            </Link>
          ) : null,

          center: undefined,

          right: breakpoints.m ? (
            <HeaderDesktop
              theme={theme}
              setTheme={setTheme}
              items={menu(logOut, isAuthenticated, setModalActive)}
            />
          ) : (
            <>
              {isAuthenticated && location.pathname === "/" && (
                <SearchMobile
                  ref={ref}
                  isComponentVisible={isComponentVisible}
                  setIsComponentVisible={setIsComponentVisible}
                />
              )}

              <HeaderMobile
                theme={theme}
                setTheme={setTheme}
                items={menu(logOut, isAuthenticated, setModalActive)}
              />
            </>
          ),
        }}
        placeholder={undefined}
      />

      {modalActive === "login" && (
        <Login modalActive={modalActive} setModalActive={setModalActive} />
      )}

      {modalActive === "register" && (
        <Register modalActive={modalActive} setModalActive={setModalActive} />
      )}
    </header>
  )
}
