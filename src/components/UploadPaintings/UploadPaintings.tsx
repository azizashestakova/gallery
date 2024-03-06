import { FC } from "react"
import cn from "classnames/bind"
import { ReactSVG } from "react-svg"

import { Text } from "@consta/uikit/Text"
import { Button } from "@consta/uikit/Button"

import { IconCustom } from "@/utils/icon"

import PlusIcon from "@/assets/plus.svg"

import StubIcon from "@/assets/stub.svg"

import styles from "./UploadPaintings.module.css"

const cx = cn.bind(styles)

export const UploadPaintings: FC = () => {
  return (
    <>
      <div className={cx(styles.wrapper)}>
        <div className={cx(styles.wrap)}>
          <ReactSVG className={cx("stub")} src={StubIcon} />
        </div>
        <Button
          label="Upload"
          view="secondary"
          iconRight={IconCustom(PlusIcon)}
          onlyIcon
          className={cx("button")}
          form="round"
        />
      </div>
      <Text
        view="primary"
        size="m"
        lineHeight="2xs"
        weight="medium"
        as="p"
        className={cx("description")}
        transform="uppercase"
      >
        The paintings of this artist have not been uploaded yet
      </Text>
    </>
  )
}
