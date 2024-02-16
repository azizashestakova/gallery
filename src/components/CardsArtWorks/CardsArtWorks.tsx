import { FC } from "react"
import cn from "classnames/bind"

import { Grid, GridItem } from "@consta/uikit/Grid"

import type { IPaintings } from "@/app/models/IArtist"

import { Card } from "@/components/Card"
import { Skeleton } from "@/components/Skeleton"

import { limit } from "@/constants"

import styles from "./CardsArtWorks.module.css"

const cx = cn.bind(styles)

interface CardsArtWorksProps {
  paintings: IPaintings[]
  setIsModalOpen: (value: boolean) => void
  setActiveIndex: (value: number) => void
}

export const CardsArtWorks: FC<CardsArtWorksProps> = ({
  paintings,
  setIsModalOpen,
  setActiveIndex,
}) => {
  const onClickButton = (index: number) => {
    setIsModalOpen(true)
    setActiveIndex(index)
  }

  return (
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
        ? paintings.map(({ _id, image, name, yearOfCreation }, index) => (
            <GridItem className={cx("item")} key={_id}>
              <button
                className={cx("button")}
                type="button"
                onClick={() => onClickButton(index)}
              >
                <Card
                  imageSet={image}
                  name={name}
                  yearsOfLife={yearOfCreation}
                  id={_id}
                />
              </button>
            </GridItem>
          ))
        : Array.from(Array(limit).keys()).map((item) => (
            <GridItem className={cx("item")} key={item}>
              <Skeleton />
            </GridItem>
          ))}
    </Grid>
  )
}
