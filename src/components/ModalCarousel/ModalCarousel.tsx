import { FC, useState, useEffect } from "react"
import cn from "classnames/bind"
import { useParams } from "react-router-dom"

import ClearIcon from "@/assets/clear.svg"
import { Button } from "@/components/Button"
import { Carousel } from "@/components/Carousel"
import { Modal } from "@/components/Modal"
import { ModalDelete } from "@/components/ModalDelete"
import { ModalPainting } from "@/components/ModalPainting"
import { artistApi } from "@/services/ArtistService"
import { IconCustom } from "@/utils/icon"

import type { IPaintings } from "@/app/models/IArtist"

import styles from "./ModalCarousel.module.scss"

const cx = cn.bind(styles)

interface ModalCarouselProps {
  isModalOpen: boolean
  setIsModalOpen: (value: boolean) => void
  paintings: IPaintings[]
  activeIndex: number
  paintingId: string
}

export const ModalCarousel: FC<ModalCarouselProps> = ({
  isModalOpen,
  setIsModalOpen,
  paintings,
  activeIndex,
  paintingId,
}) => {
  const [isOpenModalPaintings, setIsOpenModalPaintings] = useState(false)
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false)

  const { id: artistId = "" } = useParams()

  const [deletePainting, { isSuccess }] = artistApi.useDeletePaintingMutation()

  useEffect(() => {
    if (isSuccess) {
      setIsOpenModalDelete(false)
      setIsModalOpen(false)
    }
  }, [isSuccess, setIsModalOpen])

  const onClickDelete = (artistId: string, paintingId: string) => {
    deletePainting({ artistId, paintingId })
  }

  const painting = paintings.find(({ _id }) => paintingId === _id)

  return (
    <Modal
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      className={cx("modal")}
    >
      <Button
        label="Close"
        className={cx("button")}
        view="clear"
        iconLeft={IconCustom(ClearIcon)}
        onlyIcon
        onClick={() => {
          setIsModalOpen(false)
        }}
      />

      <Carousel
        paintings={paintings}
        activeIndex={activeIndex}
        setIsOpenModalDelete={setIsOpenModalDelete}
        setIsOpenModalPaintings={setIsOpenModalPaintings}
      />

      {isOpenModalDelete && (
        <ModalDelete
          isOpen={isOpenModalDelete}
          setIsOpen={setIsOpenModalDelete}
          variant="painting"
          onClickDelete={() => onClickDelete(artistId, paintingId)}
        />
      )}

      {painting && isOpenModalPaintings && (
        <ModalPainting
          isOpen={isOpenModalPaintings}
          setIsOpen={setIsOpenModalPaintings}
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
