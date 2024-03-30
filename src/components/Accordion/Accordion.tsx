import { FC } from "react"
import cn from "classnames/bind"

import { Spoiler } from "@consta/uikit/Spoiler"
import { useBreakpoints } from "@consta/uikit/useBreakpoints"

import ArrowDownIcon from "@/assets/arrow-down.svg"
import { IconCustom } from "@/utils/icon"

import styles from "./Accordion.module.scss"

const cx = cn.bind(styles)

interface AccordionProps {
  description: string
}

export const Accordion: FC<AccordionProps> = ({ description }) => {
  const breakpoints = useBreakpoints({
    map: { l: 1280, m: 768 },
    isActive: true,
  })

  return (
    <div className={cx("spoiler-wrapper")}>
      <Spoiler
        className={cx("spoiler")}
        lineClamp={breakpoints.l ? 5 : breakpoints.m ? 3 : 5}
        lessLabel="Read less"
        moreLabel="Read more"
        moreIcon={IconCustom(ArrowDownIcon)}
      >
        {description}
      </Spoiler>
    </div>
  )
}
