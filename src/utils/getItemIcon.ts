import { IconCustom } from "../features/icon/icon"

import MoonIcon from "../assets/moon.svg"
import SunIcon from "../assets/sun.svg"

import type { ThemeName } from "../types/theme"

export const getItemIcon = (item: ThemeName) => {
  if (item === "gpnDefault") {
    return IconCustom(MoonIcon)
  }
  return IconCustom(SunIcon)
}
