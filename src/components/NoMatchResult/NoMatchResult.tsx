import { FC } from "react"
import cn from "classnames/bind"

import { Text } from "@consta/uikit/Text"

import styles from "./NoMatchResult.module.scss"

const cx = cn.bind(styles)

interface NoMatchResultProps {
  text: string
}

export const NoMatchResult: FC<NoMatchResultProps> = ({ text }) => (
  <div className={cx("wrapper")}>
    <Text
      view="primary"
      size="m"
      lineHeight="2xs"
      weight="light"
      as="h1"
      className={cx("title")}
    >
      No matches for{" "}
      <Text view="primary" size="m" lineHeight="2xs" weight="medium" as="span">
        {text.trim() ? text : "search"}
      </Text>
    </Text>

    <Text
      view="primary"
      size="xs"
      lineHeight="2xs"
      weight="light"
      as="p"
      className={cx("description")}
    >
      Please try again with a different spelling or keywords.
    </Text>
  </div>
)
