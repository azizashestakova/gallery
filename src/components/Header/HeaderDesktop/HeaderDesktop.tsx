import { Dispatch, FC, SetStateAction } from "react"
import cn from "classnames/bind"

import { ButtonMenu } from "@consta/header/ButtonMenu"
import { ThemeToggler } from "@consta/uikit/ThemeToggler"

import { items as itemsTheme } from "@/components/Header/constants"
import { getItemIcon } from "@/utils/getItemIcon"

import type { MenuItem } from "../types"
import type { ThemeName } from "@/types/theme"

import styles from "./HeaderDesktop.module.scss"

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
    <div className={cx("wrapper")}>
      <ButtonMenu className={cx("buttons")} items={items} view="clear" />
      <ThemeToggler
        className={cx("theme")}
        items={itemsTheme}
        value={theme}
        getItemKey={(item: ThemeName) => item}
        getItemLabel={(item: ThemeName) => item}
        getItemIcon={getItemIcon}
        onChange={setTheme}
      />
    </div>
  )
}
