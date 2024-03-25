import { FC, ReactNode } from "react"
import cn from "classnames/bind"

import { Modal } from "@consta/uikit/Modal"

import ClearIcon from "@/assets/clear.svg"
import { Button } from "@/components/Button"
import { IconCustom } from "@/utils/icon"

import styles from "./ModalWindow.module.scss"

const cx = cn.bind(styles)

interface ModalWindowProps {
  children: ReactNode
  modalActive: string
  setModalActive: (value: string) => void
}

export const ModalWindow: FC<ModalWindowProps> = ({
  children,
  modalActive,
  setModalActive,
}) => {
  return (
    <Modal
      isOpen={!!modalActive}
      onClickOutside={() => {
        setModalActive("")
      }}
      onEsc={() => {
        setModalActive("")
      }}
      className={cx("modal")}
    >
      <Button
        label="Close"
        view="ghost"
        onlyIcon
        iconLeft={IconCustom(ClearIcon)}
        className={cx("button")}
        onClick={() => {
          setModalActive("")
        }}
      />
      {children}
    </Modal>
  )
}
