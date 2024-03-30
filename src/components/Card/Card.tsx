import { FC } from "react"
import cn from "classnames/bind"
import { ReactSVG } from "react-svg"

import { Card as CardConsta } from "@consta/uikit/Card"
import { Text } from "@consta/uikit/Text"
import { useBreakpoints } from "@consta/uikit/useBreakpoints"

import ArrowIcon from "@/assets/arrow.svg"
import { Image } from "@/components/Image"
import { Stub } from "@/components/Stub"
import { convertDateToYear } from "@/utils/convertDateToYear"

import type { ImageSet } from "@/app/models/IArtist"

import styles from "./Card.module.scss"

const cx = cn.bind(styles)

interface CardProps {
  imageSet: ImageSet
  name: string
  yearsOfLife: string
  className?: string
}

export const Card: FC<CardProps> = ({
  imageSet,
  name,
  yearsOfLife,
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
        <Image alt={name} imageSet={imageSet} className={cx("image")} />
      ) : (
        <Stub className={cx("stub")} />
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

        <ReactSVG className={cx("icon")} src={ArrowIcon} />
      </div>
    </CardConsta>
  )
}
