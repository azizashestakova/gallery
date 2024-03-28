import { RefObject, forwardRef } from "react"
import cn from "classnames/bind"

import SearchIcon from "@/assets/search.svg"
import { Button } from "@/components/Button"
import { SearchField } from "@/components/SearchField"
import { IconCustom } from "@/utils/icon"

import styles from "./SearchMobile.module.scss"

const cx = cn.bind(styles)

interface SearchMobileProps {
  ref: RefObject<HTMLDivElement>
  isComponentVisible: boolean
  setIsComponentVisible: (value: boolean) => void
}

export type Ref = HTMLDivElement

export const SearchMobile = forwardRef<Ref, SearchMobileProps>(
  ({ isComponentVisible, setIsComponentVisible }, ref) => {
    return (
      <div ref={ref}>
        {isComponentVisible ? (
          <SearchField />
        ) : (
          <Button
            className={cx("button")}
            label="Search"
            view="ghost"
            iconLeft={IconCustom(SearchIcon)}
            onlyIcon
            onClick={() => setIsComponentVisible(true)}
          />
        )}
      </div>
    )
  },
)
