import { FC } from "react"
import { ReactSVG } from "react-svg"
import cn from "classnames/bind"

import { useBreakpoints } from "@consta/uikit/useBreakpoints"

import { Card as CardConsta } from "@consta/uikit/Card"
import { Text } from "@consta/uikit/Text"

import { Image } from "@/components/Card/Image"

import ArrowIcon from "@/assets/arrow.svg"
import StubIcon from "@/assets/stub.svg"

import type { IMainPainting } from "@/app/models/IArtist"

import { convertDateToYears } from "@/utils/convertDatesToYears"

import styles from "./Card.module.css"

const cx = cn.bind(styles)

interface CardProps {
  mainPainting: IMainPainting
  name: string
  yearsOfLife: string
}

export const Card: FC<CardProps> = ({ mainPainting, name, yearsOfLife }) => {
  const breakpoints = useBreakpoints({
    map: { l: 576 },
    isActive: true,
  })

  const date = convertDateToYears(yearsOfLife)

  return (
    <CardConsta className={cx("card")}>
      {mainPainting ? (
        <Image
          src={mainPainting.image.src}
          src2x={mainPainting.image.src2x}
          webp={mainPainting.image.webp}
          webp2x={mainPainting.image.webp2x}
          alt={mainPainting.name}
        />
      ) : (
        <ReactSVG className={cx("stub")} src={StubIcon} />
      )}
      <div className={cx("content")}>
        <div className={cx("wrapper")}>
          <Text
            view="primary"
            size={breakpoints.l ? "m" : "s"}
            lineHeight={breakpoints.l ? "l" : "xs"}
            transform="uppercase"
            as="h2"
            truncate
            className={cx("text")}
          >
            {name}
          </Text>
          <Text
            view="secondary"
            size="xs"
            lineHeight={breakpoints.l ? "s" : "2xs"}
            weight="bold"
            as="p"
            truncate
            className={cx("text")}
          >
            {date}
          </Text>
        </div>
        <div className={cx("icon-wrapper")}>
          <ReactSVG className={cx("icon")} src={ArrowIcon} />
        </div>
      </div>
    </CardConsta>
  )
}
