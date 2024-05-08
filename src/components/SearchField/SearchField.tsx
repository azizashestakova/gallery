import { FC, useCallback, useContext, useEffect, useState } from "react"
import cn from "classnames/bind"
import { useSearchParams } from "react-router-dom"

import { TextField, TextFieldPropValue } from "@consta/uikit/TextField"
import { useDebounce } from "@consta/uikit/useDebounce"

import ClearIcon from "@/assets/clear.svg"
import SearchIcon from "@/assets/search.svg"
import { Button } from "@/components/Button"
import { FilterContext } from "@/context/FilterProvider"
import { IconCustom } from "@/utils/icon"

import styles from "./SearchField.module.scss"

const cx = cn.bind(styles)

export const SearchField: FC = () => {
  const { filters, changeFilters, clearSearch } = useContext(FilterContext)

  const [params] = useSearchParams({})
  const name = params.get("name")

  const [value, setValue] = useState<string | null>(name || null)
  const [searchValue, setSearchValue] = useState<string | null>(null)

  const debounceSetSearchValue = useDebounce(setSearchValue, 500)

  useEffect(
    () => debounceSetSearchValue(value),
    [debounceSetSearchValue, value],
  )

  useEffect(() => {
    if (searchValue) {
      changeFilters({ ...filters, name: searchValue })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue])

  const clearValue = useCallback(() => {
    setValue("")
    clearSearch()
  }, [clearSearch])

  useEffect(() => {
    if (!value) {
      clearValue()
    }
  }, [clearValue, value])

  const changeValue = (value: TextFieldPropValue) => {
    setValue(value)
  }

  return (
    <div className={cx("wrapper")}>
      <TextField
        className={cx("search")}
        onChange={changeValue}
        value={value}
        type="search"
        placeholder="Search"
        leftSide={IconCustom(SearchIcon)}
      />

      {value ? (
        <Button
          label="Close"
          view="ghost"
          onlyIcon
          iconLeft={IconCustom(ClearIcon)}
          className={cx("clear")}
          onClick={clearValue}
        />
      ) : null}
    </div>
  )
}
