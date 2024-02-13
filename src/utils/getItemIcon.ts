import { IconCustom } from "@/utils/icon"

import MoonIcon from "@/assets/moon.svg"
import SunIcon from "@/assets/sun.svg"

import { themeDefault } from "@/constants"

import type { ThemeName } from "@/types/theme"

export const getItemIcon = (item: ThemeName) => {
  if (item === themeDefault) {
    return IconCustom(MoonIcon)
  }
  return IconCustom(SunIcon)
}
