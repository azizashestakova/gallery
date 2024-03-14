import { FC, useCallback, useContext, useMemo, useState } from "react"
import cn from "classnames/bind"
import { ReactSVG } from "react-svg"

import { Modal } from "@consta/uikit/Modal"
import { CollapseGroup } from "@consta/uikit/CollapseGroup"

import { IconCustom } from "@/utils/icon"

import ClearIcon from "@/assets/clear.svg"
import MinusIcon from "@/assets/minus.svg"
import PlusIcon from "@/assets/plus.svg"

import { FilterContext, Filters } from "@/context/FilterProvider"

import { genresApi } from "@/services/GenresServices"
import { artistApi } from "@/services/ArtistService"

import { ContentItem, geItems } from "./constants"

import styles from "./ModalFilter.module.css"

const cx = cn.bind(styles)

interface ModalFilterProps {
  isOpen: boolean
  setIsOpenModalFilter: (value: boolean) => void
}

// TODO:: Проверить логику и типизацию

export const ModalFilter: FC<ModalFilterProps> = ({
  isOpen,
  setIsOpenModalFilter,
}) => {
  const { data: genresData = [] } = genresApi.useFetchGenresQuery(null)
  // const { data: { data: artistsData = [] } = {} } =
  //   artistsApi.useFetchAllArtistsQuery({
  //     isAuthenticated: false,
  //     params: {},
  //   })

  const { filters, changeFilters, clearFilters } = useContext(FilterContext)

  const [selectedGenre, setSelectedGenre] = useState(filters.genres || "")
  const [selectedSort, setSelectedSort] = useState(filters.orderBy || "")

  // const genres = useMemo(() => {
  //   const genres = artistsData?.map((artist) => artist.genres).flat()
  //   return genresData.filter((genre) => genres?.includes(genre._id))
  // }, [genresData, artistsData])

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
        onClick={(e) => handleToggleSelected(_id)}
      >
        {name}
      </button>
    ))

  const handleShowFilterResult = () => {
    changeFilters({
      ...filters,
      genres: selectedGenre,
      orderBy: selectedSort,
      sortBy: "name",
    } as Filters)
  }

  const handleClearFilter = useCallback(() => {
    clearFilters()
    setSelectedGenre("")
    setSelectedSort("")
  }, [clearFilters])

  const items = geItems(genresData)

  return (
    <Modal
      isOpen={isOpen}
      onClickOutside={(e) => {
        if ((e.target as HTMLElement).classList.contains("Modal-Overlay")) {
          setIsOpenModalFilter(false)
        }
      }}
      onEsc={() => {
        setIsOpenModalFilter(false)
      }}
      className={cx("modal")}
    >
      <button
        className={cx("button-close")}
        type="button"
        onClick={() => setIsOpenModalFilter(false)}
      >
        <ReactSVG src={ClearIcon} />
      </button>
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
          <button className={cx("button")} onClick={handleShowFilterResult}>
            Show the results
          </button>
          <button className={cx("button")} onClick={handleClearFilter}>
            Clear
          </button>
        </div>
      </div>
    </Modal>
  )
}
