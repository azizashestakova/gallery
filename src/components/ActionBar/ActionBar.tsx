import { FC, ReactNode } from "react"
import cn from "classnames/bind"

import { Grid } from "@consta/uikit/Grid"

import styles from "./ActionBar.module.scss"

const cx = cn.bind(styles)

interface ActionBarProps {
  children: ReactNode
}

export const ActionBar: FC<ActionBarProps> = ({ children }) => {
  return <Grid className={cx("wrapper")}>{children}</Grid>
}
