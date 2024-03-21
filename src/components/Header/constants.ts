import { Location, NavigateFunction } from "react-router-dom"

import { themeDefault, themeDark } from "@/constants"

import type { MenuItem } from "@/components/Header/types"
import type { ThemeName } from "@/types/theme"

export const items: ThemeName[] = [themeDefault, themeDark]

export const mode = {
  gpnDefault: "Dark mode",
  gpnDark: "Light mode",
}

export const menu = (
  navigate: NavigateFunction,
  location: Location<any>,
  logOut: () => void,
  isAuthenticated: boolean,
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
            navigate("/login", { state: { background: location } })
          },
        },
        {
          label: "Sign up",
          onClick: () => {
            navigate("/register", { state: { background: location } })
          },
        },
      ]
}
