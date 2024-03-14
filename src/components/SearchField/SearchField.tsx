import { FC, useContext, useEffect, useState } from "react"
import cn from "classnames/bind"
import { ReactSVG } from "react-svg"
import { useSearchParams } from "react-router-dom"

import { useDebounce } from "@consta/uikit/useDebounce"

import { TextField, TextFieldPropValue } from "@consta/uikit/TextField"

import { IconCustom } from "@/utils/icon"

import { FilterContext } from "@/context/FilterProvider"

import SearchIcon from "@/assets/search.svg"
import ClearIcon from "@/assets/clear.svg"

import styles from "./SearchField.module.css"

const cx = cn.bind(styles)

export const SearchField: FC = () => {
  const { filters, changeFilters, clearSearch } = useContext(FilterContext)

  const [value, setValue] = useState<string | null>(null)
  const [searchValue, setSearchValue] = useState<string | null>(null)

  const debounceSetSearchValue = useDebounce(setSearchValue, 500)

  useEffect(
    () => debounceSetSearchValue(value),
    [debounceSetSearchValue, value],
  )

  const [params] = useSearchParams({})

  useEffect(() => {
    if (searchValue) {
      changeFilters({ ...filters, name: searchValue })
    }
  }, [searchValue])

  useEffect(() => {
    const name = params.get("name")

    if (!name) {
      setValue("")
    }
  }, [params])

  const handleChange = (value: TextFieldPropValue) => {
    setValue(value)
  }

  const handleClearValue = () => {
    setValue("")
    clearSearch()
  }

  return (
    <div className={cx("wrapper")}>
      <TextField
        className={cx("search")}
        onChange={handleChange}
        value={value}
        type="search"
        placeholder="Search"
        leftSide={IconCustom(SearchIcon)}
      />
      {value ? (
        <button
          className={cx("clear")}
          type="button"
          onClick={handleClearValue}
        >
          <ReactSVG src={ClearIcon} />
        </button>
      ) : null}
    </div>
  )
}
