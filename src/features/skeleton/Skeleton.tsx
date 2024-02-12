import { FC } from "react"
import cn from "classnames/bind"

import { SkeletonBrick } from "@consta/uikit/Skeleton"
import { Grid, GridItem } from "@consta/uikit/Grid"

import styles from "./Skeleton.module.css"

const cx = cn.bind(styles)

export const Skeleton: FC = () => {
  return (
    <SkeletonBrick className={cx("brick")} height={260}>
      <Grid className={cx("wrapper")} gap="xs">
        <GridItem className={cx("text", "text-first")} />
        <GridItem className={cx("text", "text-second")} />
      </Grid>
    </SkeletonBrick>
  )
}
