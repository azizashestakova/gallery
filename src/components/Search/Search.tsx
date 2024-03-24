import { FC, useState } from "react"
import cn from "classnames/bind"

import { Grid } from "@consta/uikit/Grid"
import { useBreakpoints } from "@consta/uikit/useBreakpoints"

import FilterIcon from "@/assets/filter.svg"
import { Button } from "@/components/Button"
import { ModalFilter } from "@/components/ModalFilter"
import { SearchField } from "@/components/SearchField"
import { IconCustom } from "@/utils/icon"

import styles from "./Search.module.scss"

const cx = cn.bind(styles)

export const Search: FC = () => {
  const breakpoints = useBreakpoints({
    map: { m: 768 },
    isActive: true,
  })

  const [isOpenModalFilter, setIsOpenModalFilter] = useState(false)

  return (
    <Grid className={cx("search")} as="search">
      {breakpoints.m ? <SearchField /> : null}
      <Button
        className={cx("button")}
        label="Filter"
        view="clear"
        iconLeft={IconCustom(FilterIcon)}
        onlyIcon
        onClick={() => setIsOpenModalFilter(true)}
      />
      <ModalFilter
        isOpen={isOpenModalFilter}
        setIsOpenModalFilter={setIsOpenModalFilter}
      />
    </Grid>
  )
}
