import { FC } from "react"
import cn from "classnames/bind"

import { Chips } from "@consta/uikit/Chips"
import { Grid } from "@consta/uikit/Grid"
import { Spoiler } from "@consta/uikit/Spoiler"
import { Text } from "@consta/uikit/Text"
import { useBreakpoints } from "@consta/uikit/useBreakpoints"

import ArrowDownIcon from "@/assets/arrow-down.svg"
import { Image } from "@/components/Card/Image"
import { EmptyAvatar } from "@/components/EmptyAvatar"
import { IconCustom } from "@/utils/icon"

import type { ImageSet } from "@/app/models/IArtist"

import styles from "./ArtistInfo.module.css"

const cx = cn.bind(styles)

interface ArtistInfoProps {
  yearsOfLife: string
  name: string
  description: string
  genres: any
  imageSet: ImageSet
}

export const ArtistInfo: FC<ArtistInfoProps> = ({
  yearsOfLife,
  name,
  description,
  genres,
  imageSet,
}) => {
  const breakpoints = useBreakpoints({
    map: { l: 1280, m: 768 },
    isActive: true,
  })

  const getItemLabel = (item: any) => item.name

  return (
    <Grid as="article" className={cx("wrapper")}>
      <div className={cx("wrapper-image")}>
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
          <EmptyAvatar />
        )}
      </div>
      <Grid as="section" className={cx("info")}>
        <div className={cx("text-wrapper")}>
          <Text
            view="primary"
            size={breakpoints.m ? "m" : "xs"}
            lineHeight={breakpoints.m ? "2xs" : "xs"}
            as="span"
            className={cx("text")}
          >
            {yearsOfLife}
          </Text>
          <Text
            view="secondary"
            size={breakpoints.l ? "5xl" : breakpoints.m ? "4xl" : "3xl"}
            lineHeight="2xs"
            weight="medium"
            as="h1"
            className={cx("title")}
          >
            {name}
          </Text>
        </div>
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
        <Chips
          className={cx("chips")}
          items={genres}
          getItemLabel={getItemLabel}
        />
      </Grid>
    </Grid>
  )
}
