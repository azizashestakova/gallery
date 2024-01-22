import { Dispatch, FC, SetStateAction } from "react"
import { Link } from "react-router-dom"
import { ReactSVG } from "react-svg"

import { ThemeToggler } from "@consta/uikit/ThemeToggler"

import { Layout } from "@consta/header/Layout"
import { ButtonMenu } from "@consta/header/ButtonMenu"

import LogoIcon from "../../assets/logo.svg"

import { items, menu } from "./constants"

import { getItemIcon } from "../../utils/getItemIcon"

import type { ThemeName } from "../../types/theme"

import styles from "./Header.module.css"

interface HeaderProps {
  theme: ThemeName
  setTheme: Dispatch<SetStateAction<ThemeName>>
}

export const Header: FC<HeaderProps> = ({ theme, setTheme }) => {
  return (
    <Layout
      className={styles.header}
      rowCenter={{
        left: (
          <Link to="/">
            <ReactSVG src={LogoIcon} className={styles.logo} />
          </Link>
        ),
        center: undefined,
        right: (
          <>
            <ButtonMenu className={styles.buttons} items={menu} view="clear" />
            <ThemeToggler
              items={items}
              value={theme}
              getItemKey={(item: ThemeName) => item}
              getItemLabel={(item: ThemeName) => item}
              getItemIcon={getItemIcon}
              onChange={setTheme}
              direction="downStartLeft"
            />
          </>
        ),
      }}
      placeholder={undefined}
    />
  )
}
