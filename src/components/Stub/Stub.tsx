import { FC } from "react"
import cn from "classnames/bind"
import { ReactSVG } from "react-svg"

import { Grid } from "@consta/uikit/Grid"
import { Text } from "@consta/uikit/Text"

import StubIcon from "@/assets/stub.svg"

import styles from "./Stub.module.scss"

const cx = cn.bind(styles)

interface StubProps {
  className?: string
}

export const Stub: FC<StubProps> = ({ className }) => {
  return (
    <Grid className={cx(className, "wrapper")}>
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
