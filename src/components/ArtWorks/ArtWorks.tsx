import { FC } from "react"
import cn from "classnames/bind"

import { useBreakpoints } from "@consta/uikit/useBreakpoints"

import { Grid } from "@consta/uikit/Grid"
import { Text } from "@consta/uikit/Text"

import { CardsArtWorks } from "@/components/CardsArtWorks"

import styles from "./ArtWorks.module.css"

const cx = cn.bind(styles)

interface ArtWorksProps {
  paintings: any
}

export const ArtWorks: FC<ArtWorksProps> = ({ paintings }) => {
  console.log("paintings", paintings)

  const breakpoints = useBreakpoints({
    map: { l: 576 },
    isActive: true,
  })

  return (
    <Grid as="article">
      <Text
        view="secondary"
        size={breakpoints.l ? "5xl" : "3xl"}
        lineHeight={breakpoints.l ? "xs" : "2xs"}
        as="h2"
        className={cx("title")}
      >
        Artworks
      </Text>
      <Grid className={cx("wrapper")}>
        <CardsArtWorks paintings={paintings} />
      </Grid>
    </Grid>
  )
}
