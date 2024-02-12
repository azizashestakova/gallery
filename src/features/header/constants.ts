import type { ThemeName } from "../../types/theme"
import type { MenuItem } from "./types"

export const items: ThemeName[] = ["gpnDefault", "gpnDark"]

export const mode = {
  gpnDefault: "Dark mode",
  gpnDark: "Light mode",
}

export const menu: MenuItem[] = [
  {
    label: "Log in",
    onClick: (e) => {
      // TODO:: Добавить открытие модального окна
      console.log("red")
    },
  },
  {
    label: "Sign up",
    onClick: (e) => {
      // TODO:: Добавить открытие модального окна
    },
  },
]
