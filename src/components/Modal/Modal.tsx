import { FC, ReactNode } from "react"
import cn from "classnames/bind"

import { Modal as ModalConsta } from "@consta/uikit/Modal"

import styles from "./Modal.module.css"

const cx = cn.bind(styles)

interface ModalConstaProps {
  isModalOpen: boolean
  setIsModalOpen: (value: boolean) => void
  children: ReactNode
  className?: string
  hasOverlay?: boolean
}

export const Modal: FC<ModalConstaProps> = ({
  isModalOpen,
  setIsModalOpen,
  children,
  className,
  hasOverlay = false,
}) => {
  return (
    <ModalConsta
      isOpen={isModalOpen}
      hasOverlay={hasOverlay}
      onClickOutside={() => setIsModalOpen(false)}
      onEsc={() => setIsModalOpen(false)}
      className={cx("modal", className)}
    >
      {children}
    </ModalConsta>
  )
}
