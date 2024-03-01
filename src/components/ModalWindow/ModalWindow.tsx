import { FC, ReactNode } from "react"
import { useNavigate } from "react-router-dom"
import cn from "classnames/bind"
import { ReactSVG } from "react-svg"

import { Modal } from "@consta/uikit/Modal"

import ClearIcon from "@/assets/clear.svg"

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
      onClickOutside={() => {
        navigate(-1)
      }}
      onEsc={() => {
        navigate(-1)
      }}
      className={cx("modal")}
    >
      <button
        className={cx("button")}
        type="button"
        onClick={() => {
          navigate(-1)
        }}
      >
        <ReactSVG src={ClearIcon} />
      </button>
      {children}
    </Modal>
  )
}
