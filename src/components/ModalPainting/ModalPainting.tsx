import { FC } from "react"
import cn from "classnames/bind"

import ClearIcon from "@/assets/clear.svg"
import { Button } from "@/components/Button"
import { Modal } from "@/components/Modal"
import { PaintingForm } from "@/components/ModalPainting/PaintingForm"
import { IconCustom } from "@/utils/icon"

import type { IDefaultValues } from "./types"

import styles from "./ModalPainting.module.scss"

const cx = cn.bind(styles)

interface ModalPaintingProps {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
  defaultValues?: IDefaultValues
}

export const ModalPainting: FC<ModalPaintingProps> = ({
  isOpen,
  setIsOpen,
  defaultValues,
}) => {
  return (
    <Modal
      isModalOpen={isOpen}
      setIsModalOpen={setIsOpen}
      className={cx("modal")}
      hasOverlay
    >
      <Button
        label="Close"
        view="ghost"
        onlyIcon
        iconLeft={IconCustom(ClearIcon)}
        className={cx("button-close")}
        onClick={() => setIsOpen(false)}
      />
      <PaintingForm defaultValues={defaultValues} setIsOpen={setIsOpen} />
    </Modal>
  )
}
