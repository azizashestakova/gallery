import { FC, useState, useEffect } from "react"
import cn from "classnames/bind"
import { useParams } from "react-router-dom"
import { ReactSVG } from "react-svg"

import ClearIcon from "@/assets/clear.svg"
import { Carousel } from "@/components/Carousel"
import { Modal } from "@/components/Modal"
import { ModalDelete } from "@/components/ModalDelete"
import { ModalPaint } from "@/components/ModalPaint"
import { artistApi } from "@/services/ArtistService"

import type { IPaintings } from "@/app/models/IArtist"

import styles from "./ModalFull.module.css"

const cx = cn.bind(styles)

interface ModalFullProps {
  isModalOpen: boolean
  setIsModalOpen: (value: boolean) => void
  paintings: IPaintings[]
  activeIndex: number
  paintingId: string
}

export const ModalFull: FC<ModalFullProps> = ({
  isModalOpen,
  setIsModalOpen,
  paintings,
  activeIndex,
  paintingId,
}) => {
  const [isOpenModalPaint, setIsOpenModalPaint] = useState(false)
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false)

  const { id: artistId = "" } = useParams()

  const [deletePainting, { isSuccess }] = artistApi.useDeletePaintingMutation()

  const onClickDelete = (artistId: string, paintingId: string) => {
    deletePainting({ artistId, paintingId })
  }

  useEffect(() => {
    if (isSuccess) {
      setIsOpenModalDelete(false)
      setIsModalOpen(false)
    }
  }, [isSuccess, setIsModalOpen])

  const painting = paintings.find(({ _id }) => paintingId === _id)

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
        <ReactSVG src={ClearIcon} />
      </button>
      <Carousel
        paintings={paintings}
        activeIndex={activeIndex}
        setIsOpenModalDelete={setIsOpenModalDelete}
        setIsOpenModalPaint={setIsOpenModalPaint}
      />
      <ModalDelete
        isOpen={isOpenModalDelete}
        setIsOpen={setIsOpenModalDelete}
        variant="painting"
        onClickDelete={() => onClickDelete(artistId, paintingId)}
      />
      {painting && (
        <ModalPaint
          isOpen={isOpenModalPaint}
          setIsOpen={setIsOpenModalPaint}
          defaultValues={{
            id: paintingId,
            name: painting.name,
            yearOfCreation: painting.yearOfCreation,
            image: painting.image.webp,
          }}
        />
      )}
    </Modal>
  )
}
