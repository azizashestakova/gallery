import { themeDefault, themeDark } from "@/constants"
import { Location, NavigateFunction } from "react-router-dom"

import type { ThemeName } from "@/types/theme"
import type { MenuItem } from "@/components/Header/types"

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
