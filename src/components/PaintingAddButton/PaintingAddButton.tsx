import { FC, useState } from "react"
import cn from "classnames/bind"

import PlusIcon from "@/assets/plus.svg"
import { Button } from "@/components/Button"
import { ModalPainting } from "@/components/ModalPainting"
import { IconCustom } from "@/utils/icon"

import styles from "./PaintingAddButton.module.scss"

const cx = cn.bind(styles)

export const PaintingAddButton: FC = () => {
  const [isOpenModalPainting, setIsOpenModalPainting] = useState(false)

  return (
    <>
      <Button
        label="Add picture"
        className={cx("button")}
        view="ghost"
        iconLeft={IconCustom(PlusIcon)}
        onClick={() => {
          setIsOpenModalPainting(true)
        }}
      />

      <ModalPainting
        isOpenModalPainting={isOpenModalPainting}
        setIsOpenModalPainting={setIsOpenModalPainting}
      />
    </>
  )
}
