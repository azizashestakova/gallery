import { Dispatch, FC, SetStateAction } from "react"
import cn from "classnames/bind"

import { ThemeToggler } from "@consta/uikit/ThemeToggler"
import { ButtonMenu } from "@consta/header/ButtonMenu"

import { items, menu } from "@/components/Header/constants"

import { getItemIcon } from "@/utils/getItemIcon"

import type { ThemeName } from "@/types/theme"

import styles from "./HeaderDesktop.module.css"

const cx = cn.bind(styles)

interface HeaderDesktopProps {
  theme: ThemeName
  setTheme: Dispatch<SetStateAction<ThemeName>>
}

export const HeaderDesktop: FC<HeaderDesktopProps> = ({ theme, setTheme }) => (
  <>
    <ButtonMenu className={cx("buttons")} items={menu} view="clear" />
    <ThemeToggler
      items={items}
      value={theme}
      getItemKey={(item: ThemeName) => item}
      getItemLabel={(item: ThemeName) => item}
      getItemIcon={getItemIcon}
      onChange={setTheme}
    />
  </>
)
