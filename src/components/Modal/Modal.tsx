import { FC, ReactNode, useEffect } from "react"
import cn from "classnames/bind"

import { Modal as ModalConsta } from "@consta/uikit/Modal"

import styles from "./Modal.module.scss"

const cx = cn.bind(styles)

interface ModalConstaProps {
  isOpenModal: boolean
  setIsOpenModal: (value: boolean) => void
  children: ReactNode
  className?: string
  hasOverlay?: boolean
}

export const Modal: FC<ModalConstaProps> = ({
  isOpenModal,
  setIsOpenModal,
  children,
  className,
  hasOverlay = false,
}) => {
  useEffect(() => {
    document.body.style.overflow = isOpenModal ? "hidden" : "unset"
  }, [isOpenModal])

  return (
    <ModalConsta
      isOpen={isOpenModal}
      hasOverlay={hasOverlay}
      onClickOutside={(e) => {
        if ((e.target as HTMLElement).classList.contains("Modal-Overlay")) {
          setIsOpenModal(false)
        }
      }}
      onEsc={() => setIsOpenModal(false)}
      className={cx("modal", className)}
    >
      {children}
    </ModalConsta>
  )
}
