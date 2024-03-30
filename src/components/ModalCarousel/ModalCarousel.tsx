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
  isOpenModalCarousel: boolean
  setIsOpenModalCarousel: (value: boolean) => void
  paintings: IPaintings[]
  activeIndex: number
  paintingId: string
}

export const ModalCarousel: FC<ModalCarouselProps> = ({
  isOpenModalCarousel,
  setIsOpenModalCarousel,
  paintings,
  activeIndex,
  paintingId,
}) => {
  const [isOpenModalPainting, setIsOpenModalPainting] = useState(false)
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false)

  const { id: artistId = "" } = useParams()

  const [deletePainting, { isSuccess }] = artistApi.useDeletePaintingMutation()

  useEffect(() => {
    if (isSuccess) {
      setIsOpenModalDelete(false)
      setIsOpenModalCarousel(false)
    }
  }, [isSuccess, setIsOpenModalCarousel])

  const onClickDelete = (artistId: string, paintingId: string) => {
    deletePainting({ artistId, paintingId })
  }

  const painting = paintings.find(({ _id }) => paintingId === _id)

  return (
    <Modal
      isOpenModal={isOpenModalCarousel}
      setIsOpenModal={setIsOpenModalCarousel}
      className={cx("modal")}
    >
      <Button
        label="Close"
        className={cx("button")}
        view="clear"
        iconLeft={IconCustom(ClearIcon)}
        onlyIcon
        onClick={() => {
          setIsOpenModalCarousel(false)
        }}
      />

      <Carousel
        paintings={paintings}
        activeIndex={activeIndex}
        setIsOpenModalDelete={setIsOpenModalDelete}
        setIsOpenModalPainting={setIsOpenModalPainting}
      />

      {isOpenModalDelete && (
        <ModalDelete
          isOpenModalDelete={isOpenModalDelete}
          setIsOpenModalDelete={setIsOpenModalDelete}
          variant="painting"
          onClickDelete={() => onClickDelete(artistId, paintingId)}
        />
      )}

      {painting && isOpenModalPainting && (
        <ModalPainting
          isOpenModalPainting={isOpenModalPainting}
          setIsOpenModalPainting={setIsOpenModalPainting}
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
