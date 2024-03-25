import { themeDefault, themeDark } from "@/constants"

import type { MenuItem } from "@/components/Header/types"
import type { ThemeName } from "@/types/theme"

export const items: ThemeName[] = [themeDefault, themeDark]

export const mode = {
  gpnDefault: "Dark mode",
  gpnDark: "Light mode",
}

export const menu = (
  logOut: () => void,
  isAuthenticated: boolean,
  setModalActive: (value: string) => void,
): MenuItem[] => {
  return isAuthenticated
    ? [
        {
          label: "Log out",
          onClick: () => {
            logOut()
          },
        },
      ]
    : [
        {
          label: "Log in",
          onClick: () => {
            setModalActive("login")
          },
        },
        {
          label: "Sign up",
          onClick: () => {
            setModalActive("register")
          },
        },
      ]
}
