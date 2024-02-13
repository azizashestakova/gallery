import { ThemePreset } from "@consta/uikit/Theme"

import type { ThemeName } from "@/types/theme"

import { presetGpnDark, presetGpnDefault } from "@/components/Theme"

export const getPreset = (themeName: ThemeName): ThemePreset => {
  const obj = {
    gpnDefault: presetGpnDefault,
    gpnDark: presetGpnDark,
  }
  return obj[themeName] || presetGpnDefault
}
