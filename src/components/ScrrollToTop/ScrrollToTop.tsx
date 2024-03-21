import { FC } from "react"
import cn from "classnames/bind"

import ArrowTopIcon from "@/assets/arrow-top.svg"
import { Button } from "@/components/Button"
import { IconCustom } from "@/utils/icon"
import { useWindowPosition } from "@/utils/useWindowPosition"

import styles from "./ScrrollToTop.module.css"

const cx = cn.bind(styles)

export const ScrrollToTop: FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    })
  }

  const scrollPosition = useWindowPosition()

  return (
    scrollPosition >= 200 && (
      <Button
        view="clear"
        onlyIcon
        iconLeft={IconCustom(ArrowTopIcon)}
        label="Open menu"
        onClick={scrollToTop}
        className={cx("button")}
      />
    )
  )
}
