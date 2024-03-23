import { Dispatch, FC, SetStateAction } from "react"
import cn from "classnames/bind"

import { MobileMenu } from "@consta/header/MobileMenu"
import { ThemeToggler } from "@consta/uikit/ThemeToggler"

import { MenuItem } from "../types"
import { Button } from "@/components/Button"
import { items as itemsTheme, mode } from "@/components/Header/constants"
import { getItemIcon } from "@/utils/getItemIcon"

import type { ThemeName } from "@/types/theme"

import styles from "./HeaderMobile.module.css"

const cx = cn.bind(styles)

interface HeaderMobileProps {
  theme: ThemeName
  setTheme: Dispatch<SetStateAction<ThemeName>>
  items: MenuItem[]
}

export const HeaderMobile: FC<HeaderMobileProps> = ({
  theme,
  setTheme,
  items,
}) => {
  return (
    <MobileMenu
      items={items}
      className={cx("burger")}
      sidebarClassName={cx("sidebar")}
      header={
        <div className={cx("header-mobile")}>
          <ThemeToggler
            className={cx("theme-toggler")}
            items={itemsTheme}
            value={theme}
            getItemKey={(item: ThemeName) => item}
            getItemLabel={(item: ThemeName) => item}
            getItemIcon={getItemIcon}
            onChange={setTheme}
          />
          <Button
            label={mode[theme]}
            view="ghost"
            className={cx("mode")}
            onClick={() => setTheme(mode[theme] as ThemeName)}
          />
          {/* TODO:: Добавить крестик закрытия */}
        </div>
      }
    />
  )
}
