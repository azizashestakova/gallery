import { FC } from "react"
import cn from "classnames/bind"

import { Chips } from "@consta/uikit/Chips"
import { Grid } from "@consta/uikit/Grid"
import { Text } from "@consta/uikit/Text"
import { useBreakpoints } from "@consta/uikit/useBreakpoints"

import { Accordion } from "@/components/Accordion"
import { Avatar } from "@/components/Avatar"

import type { IArtistResponse } from "@/app/models/IArtist"
import type { IGenre } from "@/app/models/IGenres"

import styles from "./ArtistInfo.module.scss"

const cx = cn.bind(styles)

interface ArtistInfoProps {
  artist: IArtistResponse
}

export const ArtistInfo: FC<ArtistInfoProps> = ({
  artist: { yearsOfLife, name, description, genres, avatar },
}) => {
  const breakpoints = useBreakpoints({
    map: { l: 1440, m: 768 },
    isActive: true,
  })

  const getItemLabel = (item: IGenre) => item.name

  return (
    <Grid as="article" className={cx("wrapper")}>
      <Avatar avatar={avatar} name={name} />
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
        <Accordion description={description} />
        <Chips
          className={cx("chips")}
          items={genres}
          getItemLabel={getItemLabel}
        />
      </Grid>
    </Grid>
  )
}
