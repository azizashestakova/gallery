import "../Theme.scss"
import "../_color/Theme_color_gpnDefault.scss"
import "../_color/Theme_color_gpnDark.scss"
import "../_control/Theme_control_gpnDefault.scss"
import "../_font/Theme_font_gpnDefault.scss"
import "../_size/Theme_size_gpnDefault.scss"
import "../_space/Theme_space_gpnDefault.scss"
import "../_shadow/Theme_shadow_gpnDefault.scss"

import { ThemePreset } from "../Theme"
import { themeDefault, themeDark } from "@/constants"

export const presetGpnDefault: ThemePreset = {
  color: {
    primary: themeDefault,
    accent: themeDark,
    invert: themeDark,
  },
  control: themeDefault,
  font: themeDefault,
  size: themeDefault,
  space: themeDefault,
  shadow: themeDefault,
}
