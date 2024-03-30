import { FC } from "react"
import cn from "classnames/bind"

import { Pagination as PaginationConsta } from "@consta/uikit/Pagination"

import { limit } from "@/constants"

import styles from "./Pagination.module.scss"

const cx = cn.bind(styles)

interface PaginationProps {
  totalPosts: number
  onChangePagination: (value: number) => void
  page: number
  hasPaginations?: boolean
}

export const Pagination: FC<PaginationProps> = ({
  totalPosts,
  onChangePagination,
  page,
  hasPaginations,
}) => {
  const countPages = Math.ceil(totalPosts / limit)

  return (
    hasPaginations && (
      <PaginationConsta
        className={cx("pagination")}
        items={countPages}
        value={page}
        arrows={[true, true]}
        onChange={onChangePagination}
        size="s"
      />
    )
  )
}
