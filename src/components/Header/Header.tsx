import { Dispatch, FC, SetStateAction, useEffect, useState } from "react"
import cn from "classnames/bind"
import { Link, useLocation } from "react-router-dom"
import { ReactSVG } from "react-svg"

import { Layout } from "@consta/header/Layout"
import { useBreakpoints } from "@consta/uikit/useBreakpoints"

import { useAppDispatch, useAppSelector } from "@/app/hooks"
import LogoIcon from "@/assets/logo.svg"
import SearchIcon from "@/assets/search.svg"
import { Button } from "@/components/Button"
import { HeaderDesktop } from "@/components/Header/HeaderDesktop"
import { HeaderMobile } from "@/components/Header/HeaderMobile"
import { Login } from "@/components/Login"
import { Register } from "@/components/Register"
import { SearchField } from "@/components/SearchField"
import { selectIsAuthenticated, loggedOut } from "@/features/auth/authSlice"
import { useOutsideClick } from "@/hooks/useOutsideClick"
import { IconCustom } from "@/utils/icon"

import type { ThemeName } from "@/types/theme"

import { menu } from "./constants"
import styles from "./Header.module.scss"

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
          left: (
            <>
              {!isComponentVisible ? (
                <Link to="/?perPage=9&pageNumber=1" className={cx("logo")}>
                  <ReactSVG src={LogoIcon} />
                </Link>
              ) : null}
            </>
          ),
          center: undefined,
          right: breakpoints.m ? (
            <HeaderDesktop
              theme={theme}
              setTheme={setTheme}
              items={menu(logOut, isAuthenticated, setModalActive)}
            />
          ) : (
            <>
              {!breakpoints.m && location.pathname === "/" ? (
                <div ref={ref}>
                  {isComponentVisible ? (
                    <SearchField />
                  ) : (
                    <Button
                      className={cx("button")}
                      label="Search"
                      view="ghost"
                      iconLeft={IconCustom(SearchIcon)}
                      onlyIcon
                      onClick={() => setIsComponentVisible(true)}
                    />
                  )}
                </div>
              ) : null}
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
