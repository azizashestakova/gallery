import { FC, useState } from "react"
import { useSearchParams } from "react-router-dom"
import cn from "classnames/bind"

import { Grid, GridItem } from "@consta/uikit/Grid"
import { cnMixSpace } from "@consta/uikit/MixSpace"

import { postApi } from "@/services/PostService"

import { limit } from "@/constants"

import { Pagination } from "@/features/pagination/Pagination"
import { Cards } from "@/features/cards/Cards"
import { Skeleton } from "@/features/skeleton/Skeleton"

import styles from "./Products.module.css"

const cx = cn.bind(styles)

export const Products: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [skip, setSkip] = useState<number>(
    Number(searchParams.get("skip")) || 0,
  )

  const { data: products, isLoading } = postApi.useFetchAllPostsQuery({
    limit: limit,
    skip: skip,
  })

  return (
    <Grid
      as="section"
      className={cx(
        "wrapper",
        cnMixSpace({
          mL: "auto",
          mR: "auto",
        }),
      )}
    >
      {!isLoading && products?.products.length ? (
        <>
          <Cards products={products.products} />
          {products?.total ? (
            <Pagination
              setSkip={setSkip}
              totalPosts={products.total}
              searchParams={searchParams}
              setSearchParams={setSearchParams}
            />
          ) : null}
        </>
      ) : (
        <Grid
          cols={1}
          gap="l"
          breakpoints={{
            320: {
              cols: 2,
              gap: "xl",
            },
            768: {
              cols: 3,
              gap: "2xl",
            },
          }}
        >
          {Array.from(Array(limit).keys()).map((item) => (
            <GridItem className={cx("item")} key={item}>
              <Skeleton />
            </GridItem>
          ))}
        </Grid>
      )}
    </Grid>
  )
}
