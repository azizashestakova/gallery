import { FC } from "react"
import { ReactSVG } from "react-svg"

import { useBreakpoints } from "@consta/uikit/useBreakpoints"

import { Card as CardConsta } from "@consta/uikit/Card"
import { Text } from "@consta/uikit/Text"
import { Picture } from "@consta/uikit/Picture"

import ArrowIcon from "@/assets/arrow.svg"

import styles from "./Card.module.css"

interface CardProps {
  thumbnail: string
  title: string
  description: string
}

export const Card: FC<CardProps> = ({ thumbnail, title, description }) => {
  const breakpoints = useBreakpoints({
    map: { l: 576 },
    isActive: true,
  })

  return (
    <CardConsta className={styles.card}>
      <Picture
        src={thumbnail}
        placeholder={undefined}
        className={styles.picture}
      />
      <div className={styles.content}>
        <div className={styles.wrapper}>
          <Text
            view="primary"
            size={breakpoints.l ? "m" : "s"}
            lineHeight={breakpoints.l ? "l" : "xs"}
            transform="uppercase"
            as="h2"
            truncate
          >
            {title}
          </Text>
          <Text
            view="secondary"
            size="xs"
            lineHeight={breakpoints.l ? "s" : "2xs"}
            weight="bold"
            as="p"
            truncate
          >
            {description}
          </Text>
        </div>
        <div className={styles.iconWrapper}>
          <ReactSVG className={styles.icon} src={ArrowIcon} />
        </div>
      </div>
    </CardConsta>
  )
}
