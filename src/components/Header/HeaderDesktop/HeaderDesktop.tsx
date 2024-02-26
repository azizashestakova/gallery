import { Dispatch, FC, SetStateAction } from "react"
import cn from "classnames/bind"

import { ThemeToggler } from "@consta/uikit/ThemeToggler"
import { ButtonMenu } from "@consta/header/ButtonMenu"

import { items as itemsTheme } from "@/components/Header/constants"

import { getItemIcon } from "@/utils/getItemIcon"

import type { ThemeName } from "@/types/theme"

import type { MenuItem } from "../types"

import styles from "./HeaderDesktop.module.css"

const cx = cn.bind(styles)

interface HeaderDesktopProps {
  theme: ThemeName
  setTheme: Dispatch<SetStateAction<ThemeName>>
  items: MenuItem[]
}

export const HeaderDesktop: FC<HeaderDesktopProps> = ({
  theme,
  setTheme,
  items,
}) => {
  return (
    <>
      <ButtonMenu className={cx("buttons")} items={items} view="clear" />
      <ThemeToggler
        items={itemsTheme}
        value={theme}
        getItemKey={(item: ThemeName) => item}
        getItemLabel={(item: ThemeName) => item}
        getItemIcon={getItemIcon}
        onChange={setTheme}
      />
    </>
  )
}
