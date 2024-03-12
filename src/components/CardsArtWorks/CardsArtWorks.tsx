import { FC } from "react"
import cn from "classnames/bind"

import { Grid, GridItem } from "@consta/uikit/Grid"

import type { IPaintings } from "@/app/models/IArtist"

import { Skeleton } from "@/components/Skeleton"
import { UploadPaintings } from "@/components/UploadPaintings"
import { CardArtWorks } from "@/components/CardArtWorks"

import { limit } from "@/constants"

import styles from "./CardsArtWorks.module.css"

const cx = cn.bind(styles)

interface CardsArtWorksProps {
  paintings: IPaintings[]
  setIsModalOpen: (value: boolean) => void
  setActiveIndex: (value: number) => void
  isSuccess: boolean
}

export const CardsArtWorks: FC<CardsArtWorksProps> = ({
  paintings,
  setIsModalOpen,
  setActiveIndex,
  isSuccess,
}) =>
  isSuccess && !paintings.length ? (
    <UploadPaintings />
  ) : (
    <Grid
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
      {paintings.length
        ? paintings.map((painting, index) => (
            <GridItem className={cx("item")} key={painting._id}>
              <CardArtWorks
                painting={painting}
                index={index}
                setIsModalOpen={setIsModalOpen}
                setActiveIndex={setActiveIndex}
              />
            </GridItem>
          ))
        : Array.from(Array(limit).keys()).map((item) => (
            <GridItem className={cx("item")} key={item}>
              <Skeleton />
            </GridItem>
          ))}
    </Grid>
  )
