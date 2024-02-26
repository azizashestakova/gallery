import { FC } from "react"
import cn from "classnames/bind"
import { ReactSVG } from "react-svg"

// import { Modal as ModalConsta } from "@consta/uikit/Modal"

import { Carousel } from "@/components/Carousel"
import { Modal } from "@/components/Modal"

import CloseIcon from "@/assets/close.svg"

import type { IPaintings } from "@/app/models/IArtist"

import styles from "./ModalFull.module.css"

const cx = cn.bind(styles)

interface ModalFullProps {
  isModalOpen: boolean
  setIsModalOpen: (value: boolean) => void
  paintings: IPaintings[]
  activeIndex: number
}

export const ModalFull: FC<ModalFullProps> = ({
  isModalOpen,
  setIsModalOpen,
  paintings,
  activeIndex,
}) => {
  return (
    <Modal
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
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
    </Modal>
  )
}
