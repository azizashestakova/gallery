import { Dispatch, FC, SetStateAction } from "react"
import cn from "classnames/bind"

import { MobileMenu } from "@consta/header/MobileMenu"
import { Text } from "@consta/uikit/Text"
import { ThemeToggler } from "@consta/uikit/ThemeToggler"

import { MenuItem } from "../types"
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
            items={itemsTheme}
            value={theme}
            getItemKey={(item: ThemeName) => item}
            getItemLabel={(item: ThemeName) => item}
            getItemIcon={getItemIcon}
            onChange={setTheme}
          />
          {/* TODO:: Заменить Text на что-то более подходящее */}
          <Text
            className={cx("mode")}
            view="primary"
            size="xs"
            lineHeight="xs"
            weight="bold"
            transform="uppercase"
            as="button"
            onClick={() => setTheme(mode[theme] as ThemeName)}
          >
            {mode[theme]}
          </Text>
          {/* TODO:: Добавить крестик закрытия */}
        </div>
      }
    />
  )
}
