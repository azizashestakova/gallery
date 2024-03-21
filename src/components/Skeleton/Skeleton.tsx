import { FC } from "react"
import cn from "classnames/bind"

import { Grid, GridItem } from "@consta/uikit/Grid"
import { SkeletonBrick } from "@consta/uikit/Skeleton"

import styles from "./Skeleton.module.css"

const cx = cn.bind(styles)

export const Skeleton: FC = () => (
  <SkeletonBrick className={cx("brick")} height={undefined}>
    <Grid className={cx("wrapper")} gap="xs">
      <GridItem className={cx("text", "text-first")} />
      <GridItem className={cx("text", "text-second")} />
    </Grid>
  </SkeletonBrick>
)
