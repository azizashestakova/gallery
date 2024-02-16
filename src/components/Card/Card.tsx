import { FC } from "react"
import { ReactSVG } from "react-svg"
import cn from "classnames/bind"
import { Link } from "react-router-dom"

import { useBreakpoints } from "@consta/uikit/useBreakpoints"

import { Card as CardConsta } from "@consta/uikit/Card"
import { Text } from "@consta/uikit/Text"

import { Image } from "@/components/Card/Image"

import ArrowIcon from "@/assets/arrow.svg"
import StubIcon from "@/assets/stub.svg"

import type { ImageSet } from "@/app/models/IArtist"

import { convertDateToYear } from "@/utils/convertDateToYear"

import styles from "./Card.module.css"

const cx = cn.bind(styles)

interface CardProps {
  imageSet: ImageSet
  name: string
  yearsOfLife: string
  id: string
}

export const Card: FC<CardProps> = ({ imageSet, name, yearsOfLife, id }) => {
  const breakpoints = useBreakpoints({
    map: { l: 576 },
    isActive: true,
  })

  const date = convertDateToYear(yearsOfLife)

  return (
    // TODO:: Исправить типизацию
    <CardConsta className={cx("card")} as={Link} to={`/artists/${id}`}>
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
            size={breakpoints.l ? "m" : "s"}
            lineHeight={breakpoints.l ? "l" : "xs"}
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