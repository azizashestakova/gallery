import { FC } from "react"
import cn from "classnames/bind"
import { ReactSVG } from "react-svg"

import { Modal as ModalConsta } from "@consta/uikit/Modal"

import { Carousel } from "@/components/Carousel"

import CloseIcon from "@/assets/close.svg"

import type { IPaintings } from "@/app/models/IArtist"

import styles from "./Modal.module.css"

const cx = cn.bind(styles)

interface ModalConstaProps {
  isModalOpen: boolean
  setIsModalOpen: (value: boolean) => void
  paintings: IPaintings[]
  activeIndex: number
}

export const Modal: FC<ModalConstaProps> = ({
  isModalOpen,
  setIsModalOpen,
  paintings,
  activeIndex,
}) => {
  return (
    <ModalConsta
      isOpen={isModalOpen}
      hasOverlay={false}
      onEsc={() => setIsModalOpen(false)}
      className={cx("modal")}
    >
      <button
        className={cx("button")}
        type="button"
        onClick={() => setIsModalOpen(false)}
      >
        <ReactSVG src={CloseIcon} />
      </button>
      <Carousel paintings={paintings} activeIndex={activeIndex} />
    </ModalConsta>
  )
}
