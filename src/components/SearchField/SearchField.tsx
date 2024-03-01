import { FC, useContext, useEffect } from "react"
import cn from "classnames/bind"
import { ReactSVG } from "react-svg"
import { useSearchParams } from "react-router-dom"

import { TextField, TextFieldPropValue } from "@consta/uikit/TextField"

import { IconCustom } from "@/utils/icon"

import { FilterContext } from "@/context/FilterProvider"

import { useDebounce } from "@/hooks/useDebounce"

import { useAppSelector } from "@/app/hooks"

import { selectIsAuthenticated } from "@/features/auth/authSlice"

import SearchIcon from "@/assets/search.svg"
import ClearIcon from "@/assets/clear.svg"

import styles from "./SearchField.module.css"

const cx = cn.bind(styles)

export const SearchField: FC = () => {
  const { filters, changeFilters, clearSearch } = useContext(FilterContext)

  const [debounceValue, value, setValue] = useDebounce(
    filters.name || null,
    500,
  )

  const isAuthenticated = useAppSelector(selectIsAuthenticated)

  const [params] = useSearchParams({})

  useEffect(() => {
    if (debounceValue) {
      changeFilters({ ...filters, name: debounceValue })
    }
  }, [debounceValue])

  useEffect(() => {
    if (
      isAuthenticated &&
      !params.toString() &&
      window.location.pathname === "/"
    ) {
      setValue("")
    }
  })

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
        type="text"
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
