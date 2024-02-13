import { ReactSVG } from "react-svg"

import { createIcon } from "@consta/icons/Icon"

const Icon = (icon: string) => <ReactSVG src={icon} />

export const IconCustom = (icon: string) =>
  createIcon({
    l: () => Icon(icon),
    m: () => Icon(icon),
    s: () => Icon(icon),
    xs: () => Icon(icon),
    name: "Icon",
  })
