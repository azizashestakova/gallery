import { FC, useState } from "react"
import cn from "classnames/bind"
import { ReactSVG } from "react-svg"

import { Text } from "@consta/uikit/Text"

import PlusIcon from "@/assets/plus.svg"
import StubIcon from "@/assets/stub.svg"
import { Button } from "@/components/Button"
import { ModalPainting } from "@/components/ModalPainting"
import { IconCustom } from "@/utils/icon"

import styles from "./UploadPaintings.module.scss"

const cx = cn.bind(styles)

export const UploadPaintings: FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className={cx(styles.wrapper)}>
        <div className={cx(styles.wrap)}>
          <ReactSVG className={cx("stub")} src={StubIcon} />
        </div>

        <Button
          label="Upload"
          view="secondary"
          iconLeft={IconCustom(PlusIcon)}
          onlyIcon
          className={cx("button")}
          form="round"
          onClick={() => {
            setIsOpen(true)
          }}
        />

        <ModalPainting isOpen={isOpen} setIsOpen={setIsOpen} />
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
