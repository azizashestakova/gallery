import { Dispatch, FC, SetStateAction } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { ReactSVG } from "react-svg"
import cn from "classnames/bind"

import { useBreakpoints } from "@consta/uikit/useBreakpoints"

import { Layout } from "@consta/header/Layout"

import { HeaderDesktop } from "@/components/Header/HeaderDesktop"
import { HeaderMobile } from "@/components/Header/HeaderMobile"
import { SearchField } from "@/components/SearchField"
import { Button } from "@consta/uikit/Button"

import { IconCustom } from "@/utils/icon"

import LogoIcon from "@/assets/logo.svg"
import SearchIcon from "@/assets/search.svg"

import { useAppDispatch, useAppSelector } from "@/app/hooks"

import { selectIsAuthenticated, loggedOut } from "@/features/auth/authSlice"

import type { ThemeName } from "@/types/theme"

import { menu } from "./constants"

import { useOutsideClick } from "@/hooks/useOutsideClick"

import styles from "./Header.module.css"

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

  const navigate = useNavigate()

  const location = useLocation()

  const dispatch = useAppDispatch()

  const logOut = () => {
    dispatch(loggedOut())
  }

  const isAuthenticated = useAppSelector(selectIsAuthenticated)

  return (
    <header className={cx("header")}>
      <Layout
        className={cx("wrapper", { "wrapper-search": isComponentVisible })}
        rowCenter={{
          left: (
            <>
              {!isComponentVisible ? (
                <Link to="/?perPage=9&pageNumber=1">
                  <ReactSVG src={LogoIcon} className={cx("logo")} />
                </Link>
              ) : null}
            </>
          ),
          center: undefined,
          right: breakpoints.m ? (
            <HeaderDesktop
              theme={theme}
              setTheme={setTheme}
              items={menu(navigate, location, logOut, isAuthenticated)}
            />
          ) : (
            <>
              {!breakpoints.m ? (
                <div ref={ref}>
                  {isComponentVisible ? (
                    <SearchField />
                  ) : (
                    <Button
                      className={cx("button")}
                      label="Search"
                      view="clear"
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
                items={menu(navigate, location, logOut, isAuthenticated)}
              />
            </>
          ),
        }}
        placeholder={undefined}
      />
    </header>
  )
}
