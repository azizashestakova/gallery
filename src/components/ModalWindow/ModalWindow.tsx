import { FC, ReactNode } from "react"
import cn from "classnames/bind"
import { useNavigate } from "react-router-dom"

import { Modal } from "@consta/uikit/Modal"

import ClearIcon from "@/assets/clear.svg"
import { Button } from "@/components/Button"
import { IconCustom } from "@/utils/icon"

import styles from "./ModalWindow.module.css"

const cx = cn.bind(styles)

interface ModalWindowProps {
  children: ReactNode
}

export const ModalWindow: FC<ModalWindowProps> = ({ children }) => {
  const navigate = useNavigate()

  return (
    <Modal
      isOpen={true}
      onClickOutside={(e) => {
        if ((e.target as HTMLElement).classList.contains("Modal-Overlay")) {
          navigate(-1)
        }
      }}
      onEsc={() => {
        navigate(-1)
      }}
      className={cx("modal")}
    >
      <Button
        label="Close"
        view="clear"
        onlyIcon
        iconLeft={IconCustom(ClearIcon)}
        className={cx("button")}
        onClick={() => {
          navigate(-1)
        }}
      />
      {children}
    </Modal>
  )
}
