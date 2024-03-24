import { FC } from "react"
import cn from "classnames/bind"
import { ReactSVG } from "react-svg"

import { Card as CardConsta } from "@consta/uikit/Card"
import { Text } from "@consta/uikit/Text"
import { useBreakpoints } from "@consta/uikit/useBreakpoints"

import ArrowIcon from "@/assets/arrow.svg"
import StubIcon from "@/assets/stub.svg"
import { Image } from "@/components/Card/Image"
import { convertDateToYear } from "@/utils/convertDateToYear"

import type { ImageSet } from "@/app/models/IArtist"

import styles from "./Card.module.scss"

const cx = cn.bind(styles)

interface CardProps {
  imageSet: ImageSet
  name: string
  yearsOfLife: string
  id: string
  className?: string
}

export const Card: FC<CardProps> = ({
  imageSet,
  name,
  yearsOfLife,
  id,
  className,
}) => {
  const breakpoints = useBreakpoints({
    map: { m: 768 },
    isActive: true,
  })

  const date = convertDateToYear(yearsOfLife)

  return (
    <CardConsta className={cx(className, "card")}>
      {imageSet ? (
        <Image
          src={imageSet.src}
          src2x={imageSet.src2x}
          webp={imageSet.webp}
          webp2x={imageSet.webp2x}
          alt={name}
          className={cx("image")}
        />
      ) : (
        <ReactSVG className={cx("stub")} src={StubIcon} />
      )}
      <div className={cx("content")}>
        <div className={cx("wrapper")}>
          <Text
            view="primary"
            size={breakpoints.m ? "m" : "s"}
            lineHeight={breakpoints.m ? "l" : "xs"}
            transform="uppercase"
            as="h2"
            truncate
            className={cx("text", "text-name")}
          >
            {name}
          </Text>
          <Text
            view="secondary"
            size="xs"
            lineHeight={breakpoints.m ? "s" : "2xs"}
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
