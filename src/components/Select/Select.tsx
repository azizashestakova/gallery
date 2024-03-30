import { FC, useState } from "react"
import cn from "classnames/bind"
import { Control, Controller } from "react-hook-form"

import { Combobox } from "@consta/uikit/Combobox"

import { genresApi } from "@/services/GenresServices"

import type { IGenre } from "@/app/models/IGenres"

import styles from "./Select.module.scss"

const cx = cn.bind(styles)

interface SelectProps {
  error?: string
  control: Control<
    {
      avatar?: any
      name: string
      yearsOfLife: string
      description: string
      genres: {
        name: string
        _id: string
      }[]
    },
    any
  >
}

export const Select: FC<SelectProps> = ({ error, control }) => {
  const { data: genresData = [] } = genresApi.useFetchGenresQuery(null)

  const [searchValue, setSearchValue] = useState("")

  const getItemLabel = (item: IGenre) => item.name
  const getItemKey = (item: IGenre) => item._id

  return (
    <Controller
      name="genres"
      control={control}
      rules={{ required: true }}
      render={({ field }) => (
        <Combobox
          {...field}
          className={cx("combobox")}
          dropdownClassName={cx("combobox-dropdown")}
          label="Genres"
          items={genresData}
          getItemLabel={getItemLabel}
          getItemKey={getItemKey}
          multiple
          status={error ? "warning" : undefined}
          caption={error}
          onChange={(value) => {
            setSearchValue("")
            field.onChange(value)
          }}
          onSearchValueChange={(value) => {
            setSearchValue(value)
          }}
          value={field.value}
          searchValue={searchValue}
        />
      )}
    />
  )
}
