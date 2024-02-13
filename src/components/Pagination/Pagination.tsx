import { Dispatch, FC, SetStateAction, useState } from "react"
import { SetURLSearchParams } from "react-router-dom"
import cn from "classnames/bind"

import { Pagination as PaginationConsta } from "@consta/uikit/Pagination"

import { limit } from "@/constants"

import styles from "./Pagination.module.css"

const cx = cn.bind(styles)

interface PaginationProps {
  setSkip: Dispatch<SetStateAction<number>>
  totalPosts: number
  searchParams: URLSearchParams
  setSearchParams: SetURLSearchParams
}

export const Pagination: FC<PaginationProps> = ({
  setSkip,
  totalPosts,
  searchParams,
  setSearchParams,
}) => {
  const [page, setPage] = useState(
    Number(searchParams.get("skip")) / limit + 1 || 1,
  )

  const paginationChange = (number: number) => {
    setPage(number)
    setSkip((number - 1) * limit)
    setSearchParams({ skip: String((number - 1) * limit) })
  }

  const countPages = Math.ceil(totalPosts / limit)

  return (
    <PaginationConsta
      className={cx("pagination")}
      items={countPages}
      value={page}
      arrows={[true, true]}
      visibleCount={7}
      onChange={paginationChange}
      showFirstPage
      showLastPage
      size="s"
    />
  )
}
