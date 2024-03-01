import { FC } from "react"
import cn from "classnames/bind"

import { useBreakpoints } from "@consta/uikit/useBreakpoints"

import { Grid } from "@consta/uikit/Grid"
import { Button } from "@consta/uikit/Button"

import { SearchField } from "@/components/SearchField"

import { IconCustom } from "@/utils/icon"

import FilterIcon from "@/assets/filter.svg"

import styles from "./Search.module.css"

const cx = cn.bind(styles)

export const Search: FC = () => {
  const breakpoints = useBreakpoints({
    map: { m: 768 },
    isActive: true,
  })

  return (
    <Grid className={cx("search")} as="search">
      {breakpoints.m ? <SearchField /> : null}
      <Button
        className={cx("button")}
        label="Filter"
        view="clear"
        iconLeft={IconCustom(FilterIcon)}
        onlyIcon
      />
    </Grid>
  )
}
