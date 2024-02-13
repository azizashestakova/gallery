import { Dispatch, FC, SetStateAction } from "react"
import cn from "classnames/bind"

import { MobileMenu } from "@consta/header/MobileMenu"

import { Text } from "@consta/uikit/Text"
import { ThemeToggler } from "@consta/uikit/ThemeToggler"

import { items, menu, mode } from "@/components/Header/constants"

import { getItemIcon } from "@/utils/getItemIcon"

import type { ThemeName } from "@/types/theme"

import styles from "./HeaderMobile.module.css"

const cx = cn.bind(styles)

interface HeaderMobileProps {
  theme: ThemeName
  setTheme: Dispatch<SetStateAction<ThemeName>>
}

export const HeaderMobile: FC<HeaderMobileProps> = ({ theme, setTheme }) => (
  <MobileMenu
    items={menu}
    className={cx("burger")}
    sidebarClassName={cx("sidebar")}
    header={
      <div className={cx("header-mobile")}>
        <ThemeToggler
          items={items}
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
      </div>
    }
  />
)
