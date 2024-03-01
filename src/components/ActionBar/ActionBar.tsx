import { FC } from "react"
import cn from "classnames/bind"

import { Grid } from "@consta/uikit/Grid"

import { Search } from "@/components/Search"

import styles from "./ActionBar.module.css"

const cx = cn.bind(styles)

export const ActionBar: FC = () => {
  return (
    <Grid className={cx("wrapper")}>
      <Search />
    </Grid>
  )
}
