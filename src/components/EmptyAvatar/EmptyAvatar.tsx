import { FC } from "react"
import cn from "classnames/bind"
import { ReactSVG } from "react-svg"

import { Grid } from "@consta/uikit/Grid"
import { Text } from "@consta/uikit/Text"

import StubIcon from "@/assets/stub.svg"

import styles from "./EmptyAvatar.module.css"

const cx = cn.bind(styles)

export const EmptyAvatar: FC = () => {
  return (
    <Grid className={cx("wrapper")}>
      <ReactSVG className={cx("stub")} src={StubIcon} />
      <Text
        view="normal"
        size="xl"
        lineHeight="2xs"
        weight="black"
        as="p"
        className={cx("description")}
      >
        No Image uploaded
      </Text>
    </Grid>
  )
}
