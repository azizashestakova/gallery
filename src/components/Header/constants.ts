import { themeDefault, themeDark } from "@/constants"

import type { ThemeName } from "@/types/theme"

export const themes: ThemeName[] = [themeDefault, themeDark]

export const mode = {
  gpnDefault: "Dark mode",
  gpnDark: "Light mode",
}
