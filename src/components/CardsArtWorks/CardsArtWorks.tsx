import { FC } from "react"
import cn from "classnames/bind"

import { Grid, GridItem } from "@consta/uikit/Grid"

import { CardArtWorks } from "@/components/CardArtWorks"
import { UploadPaintings } from "@/components/UploadPaintings"

import type { IPaintings } from "@/app/models/IArtist"

import styles from "./CardsArtWorks.module.css"

const cx = cn.bind(styles)

interface CardsArtWorksProps {
  paintings: IPaintings[]
  setIsModalOpen: (value: boolean) => void
  setActiveIndex: (value: number) => void
  setPaintingId: (value: string) => void
}

export const CardsArtWorks: FC<CardsArtWorksProps> = ({
  paintings,
  setIsModalOpen,
  setActiveIndex,
  setPaintingId,
}) =>
  !paintings.length ? (
    <UploadPaintings />
  ) : (
    <Grid
      as="ul"
      className={cx("wrapper")}
      cols={1}
      gap="l"
      breakpoints={{
        576: {
          cols: 2,
          gap: "xl",
        },
        1024: {
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
            setIsModalOpen={setIsModalOpen}
            setActiveIndex={setActiveIndex}
            setPaintingId={setPaintingId}
          />
        </GridItem>
      ))}
    </Grid>
  )
