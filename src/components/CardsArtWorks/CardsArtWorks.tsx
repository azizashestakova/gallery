import { FC } from "react"
import cn from "classnames/bind"

import { Grid, GridItem } from "@consta/uikit/Grid"

import { CardArtWorks } from "@/components/CardArtWorks"
import { UploadPaintings } from "@/components/UploadPaintings"

import type { IPaintings } from "@/app/models/IArtist"

import styles from "./CardsArtWorks.module.scss"

const cx = cn.bind(styles)

interface CardsArtWorksProps {
  paintings: IPaintings[]
  setIsOpenModalCarousel: (value: boolean) => void
  setActiveIndex: (value: number) => void
  setPaintingId: (value: string) => void
}

export const CardsArtWorks: FC<CardsArtWorksProps> = ({
  paintings,
  setIsOpenModalCarousel,
  setActiveIndex,
  setPaintingId,
}) => {
  const hasPaintings = paintings.length > 0

  if (!hasPaintings) {
    return <UploadPaintings />
  }

  return (
    <Grid
      as="ul"
      className={cx("wrapper")}
      cols={1}
      gap="l"
      breakpoints={{
        768: {
          cols: 2,
          gap: "xl",
        },
        1280: {
          cols: 3,
          gap: "2xl",
        },
      }}
    >
      {paintings.map((painting, index) => (
        <GridItem className={cx("item")} key={painting._id} as="li">
          <CardArtWorks
            painting={painting}
            index={index}
            setIsOpenModalCarousel={setIsOpenModalCarousel}
            setActiveIndex={setActiveIndex}
            setPaintingId={setPaintingId}
          />
        </GridItem>
      ))}
    </Grid>
  )
}
