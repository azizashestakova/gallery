import { FC } from "react"
import cn from "classnames/bind"

import { Pagination as PaginationConsta } from "@consta/uikit/Pagination"

import { limit } from "@/constants"

import styles from "./Pagination.module.scss"

const cx = cn.bind(styles)

interface PaginationProps {
  totalPosts: number
  paginationChange: (value: number) => void
  page: number
  isPaginationVisible?: boolean
}

export const Pagination: FC<PaginationProps> = ({
  totalPosts,
  paginationChange,
  page,
  isPaginationVisible,
}) => {
  const countPages = Math.ceil(totalPosts / limit)

  return (
    isPaginationVisible && (
      <PaginationConsta
        className={cx("pagination")}
        items={countPages}
        value={page}
        arrows={[true, true]}
        onChange={paginationChange}
        size="s"
      />
    )
  )
}
