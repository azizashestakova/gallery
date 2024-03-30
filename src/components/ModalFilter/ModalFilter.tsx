import { FC, useCallback, useContext, useState } from "react"
import cn from "classnames/bind"

import { CollapseGroup } from "@consta/uikit/CollapseGroup"

import ClearIcon from "@/assets/clear.svg"
import MinusIcon from "@/assets/minus.svg"
import PlusIcon from "@/assets/plus.svg"
import { Button } from "@/components/Button"
import { Modal } from "@/components/Modal"
import { FilterContext } from "@/context/FilterProvider"
import { genresApi } from "@/services/GenresServices"
import { IconCustom } from "@/utils/icon"

import type { Filters } from "@/types/filters"

import { ContentItem, geItems } from "./constants"
import styles from "./ModalFilter.module.scss"

const cx = cn.bind(styles)

interface ModalFilterProps {
  isOpenModalFilter: boolean
  setIsOpenModalFilter: (value: boolean) => void
}

// TODO:: Проверить логику и типизацию

export const ModalFilter: FC<ModalFilterProps> = ({
  isOpenModalFilter,
  setIsOpenModalFilter,
}) => {
  const { data: genresData = [] } = genresApi.useFetchGenresQuery(null)

  const { filters, changeFilters, clearFilters } = useContext(FilterContext)

  const [selectedGenre, setSelectedGenre] = useState(filters.genres || "")
  const [selectedSort, setSelectedSort] = useState(filters.orderBy || "")

  const handleToggleSelected = (id: string) => {
    if (id === "asc" || id === "desc") {
      setSelectedSort(selectedSort !== id ? id : "")
    } else {
      setSelectedGenre(selectedGenre !== id ? id : "")
    }
  }

  const getItemLabel = ({ label }: { label: string }) => label
  const getItemContent = ({ content }: { content: ContentItem[] }) =>
    content.map(({ name, _id }) => (
      <button
        key={_id}
        className={cx("collapse-item", {
          "collapse-item-active": selectedGenre === _id || selectedSort === _id,
        })}
        onClick={() => handleToggleSelected(_id)}
      >
        {name}
      </button>
    ))

  const showFilterResult = () => {
    changeFilters({
      ...filters,
      genres: selectedGenre,
      orderBy: selectedSort,
      sortBy: "name",
    } as Filters)
  }

  const clearFilter = useCallback(() => {
    clearFilters()
    setSelectedGenre("")
    setSelectedSort("")
  }, [clearFilters])

  const items = geItems(genresData)

  return (
    <Modal
      isOpenModal={isOpenModalFilter}
      setIsOpenModal={setIsOpenModalFilter}
      className={cx("modal")}
      hasOverlay
    >
      <Button
        label="Close"
        view="ghost"
        onlyIcon
        iconLeft={IconCustom(ClearIcon)}
        className={cx("button-close")}
        onClick={() => setIsOpenModalFilter(false)}
      />

      <div className={cx("content")}>
        <CollapseGroup
          items={items}
          getItemLabel={getItemLabel}
          getItemContent={getItemContent}
          iconPosition="right"
          className={cx("collapse-group")}
          icon={IconCustom(PlusIcon)}
          closeIcon={IconCustom(MinusIcon)}
        />

        <div className={cx("buttons")}>
          <Button
            label="Show the results"
            view="ghost"
            onClick={showFilterResult}
          />

          <Button label="Clear" view="ghost" onClick={clearFilter} />
        </div>
      </div>
    </Modal>
  )
}
