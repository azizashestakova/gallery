import { Dispatch, FC, SetStateAction } from "react"
import { Link } from "react-router-dom"
import { ReactSVG } from "react-svg"
import cn from "classnames/bind"

import { useBreakpoints } from "@consta/uikit/useBreakpoints"

import { cnMixFlex } from "@consta/uikit/MixFlex"

import { ThemeToggler } from "@consta/uikit/ThemeToggler"
import { Text } from "@consta/uikit/Text"

import { Layout } from "@consta/header/Layout"
import { ButtonMenu } from "@consta/header/ButtonMenu"
import { MobileMenu } from "@consta/header/MobileMenu"

import LogoIcon from "@/assets/logo.svg"

import { items, menu, mode } from "./constants"

import { getItemIcon } from "@/utils/getItemIcon"

import type { ThemeName } from "@/types/theme"

import styles from "./Header.module.css"

const cx = cn.bind(styles)

interface HeaderProps {
  theme: ThemeName
  setTheme: Dispatch<SetStateAction<ThemeName>>
}

export const Header: FC<HeaderProps> = ({ theme, setTheme }) => {
  const breakpoints = useBreakpoints({
    map: { l: 768 },
    isActive: true,
  })

  return (
    <Layout
      className={cx("header")}
      rowCenter={{
        left: (
          <Link to="/">
            <ReactSVG src={LogoIcon} className={cx("logo")} />
          </Link>
        ),
        center: undefined,
        right: breakpoints.l ? (
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
        ) : (
          <MobileMenu
            items={menu}
            className={cx("burger")}
            sidebarClassName={cx("sidebar")}
            header={
              <div
                className={cx(
                  cnMixFlex({
                    align: "center",
                    gap: "s",
                  }),
                  "header-mobile",
                )}
              >
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
        ),
      }}
      placeholder={undefined}
    />
  )
}
