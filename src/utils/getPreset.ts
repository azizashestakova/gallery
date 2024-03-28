import { ThemePreset } from "@consta/uikit/Theme"

import { presetGpnDark, presetGpnDefault } from "@/components/Theme"

import type { ThemeName } from "@/types/theme"

export const getPreset = (themeName: ThemeName): ThemePreset => {
  const obj = {
    gpnDefault: presetGpnDefault,
    gpnDark: presetGpnDark,
  }

  return obj[themeName] || presetGpnDefault
}
