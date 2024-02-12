import { FC } from "react"
import cn from "classnames/bind"

import { Grid, GridItem } from "@consta/uikit/Grid"

import type { IProduct } from "@/app/models/IProduct"

import { Card } from "@/features/card/Card"

import styles from "./Cards.module.css"

const cx = cn.bind(styles)

interface CardsProps {
  products: IProduct[]
}

export const Cards: FC<CardsProps> = ({ products }) => {
  return (
    <Grid
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
      {products.map(({ id, thumbnail, title, description }) => (
        <GridItem className={cx("item")} key={id}>
          <Card thumbnail={thumbnail} title={title} description={description} />
        </GridItem>
      ))}
    </Grid>
  )
}
