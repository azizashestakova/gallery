import { FC } from "react"
import cn from "classnames/bind"

import ArrowTopIcon from "@/assets/arrow-top.svg"
import { Button } from "@/components/Button"
import { IconCustom } from "@/utils/icon"
import { useWindowPosition } from "@/utils/useWindowPosition"

import styles from "./ScrrollToTop.module.scss"

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

  const hasButton = scrollPosition >= 200

  return (
    hasButton && (
      <Button
        view="clear"
        onlyIcon
        iconLeft={IconCustom(ArrowTopIcon)}
        label="Scroll to top"
        onClick={scrollToTop}
        className={cx("button")}
      />
    )
  )
}
