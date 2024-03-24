import { FC, ReactNode, useEffect } from "react"
import cn from "classnames/bind"

import { Modal as ModalConsta } from "@consta/uikit/Modal"

import styles from "./Modal.module.scss"

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
  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "unset"
  }, [isModalOpen])

  return (
    <ModalConsta
      isOpen={isModalOpen}
      hasOverlay={hasOverlay}
      onClickOutside={(e) => {
        if ((e.target as HTMLElement).classList.contains("Modal-Overlay")) {
          setIsModalOpen(false)
        }
      }}
      onEsc={() => setIsModalOpen(false)}
      className={cx("modal", className)}
    >
      {children}
    </ModalConsta>
  )
}
