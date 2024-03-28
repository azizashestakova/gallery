import { FC, useEffect, useState } from "react"
import cn from "classnames/bind"
import { useParams } from "react-router-dom"

import { useAppSelector } from "@/app/hooks"
import { ArtworkMenu } from "@/components/ArtworkMenu"
import { Card } from "@/components/Card"
import { ModalDelete } from "@/components/ModalDelete"
import { ModalPainting } from "@/components/ModalPainting"
import { selectIsAuthenticated } from "@/features/auth/authSlice"
import { artistApi } from "@/services/ArtistService"

import type { IPaintings } from "@/app/models/IArtist"

import styles from "./CardArtWorks.module.scss"

const cx = cn.bind(styles)

interface CardArtWorksProps {
  painting: IPaintings
  index: number
  setIsModalOpen: (value: boolean) => void
  setActiveIndex: (value: number) => void
  setPaintingId: (value: string) => void
}

export const CardArtWorks: FC<CardArtWorksProps> = ({
  painting,
  index,
  setIsModalOpen,
  setActiveIndex,
  setPaintingId,
}) => {
  const { image, name, yearOfCreation, _id } = painting

  const [deletePainting, isSuccess] = artistApi.useDeletePaintingMutation()

  const isAuthenticated = useAppSelector(selectIsAuthenticated)

  const { id: artistId = "" } = useParams()

  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false)
  const [isOpenModalPaintings, setIsOpenModalPaintings] = useState(false)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isShowGear, setIsShowGear] = useState<boolean>(false)

  useEffect(() => {
    if (isSuccess) {
      setIsOpenModalDelete(false)
    }
  }, [isSuccess])

  const onClickButton = (index: number) => {
    setIsModalOpen(true)
    setActiveIndex(index)
    setPaintingId(_id)
  }

  const onClickDelete = (artistId: string, paintingId: string) => {
    deletePainting({ artistId, paintingId })
  }

  return (
    <>
      <div
        className={cx("wrapper")}
        onMouseLeave={() => {
          setIsShowGear(false)
          setIsOpen(false)
        }}
        onMouseEnter={() => {
          if (isAuthenticated) {
            setIsShowGear(true)
          }
        }}
      >
        <ArtworkMenu
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          isShowGear={isShowGear}
          setIsShowGear={setIsShowGear}
          setIsOpenModalDelete={setIsOpenModalDelete}
          setIsOpenModalPaintings={setIsOpenModalPaintings}
          paintingId={painting._id}
        />

        <button
          className={cx("button")}
          type="button"
          onClick={() => onClickButton(index)}
        >
          <Card imageSet={image} name={name} yearsOfLife={yearOfCreation} />
        </button>
      </div>

      <ModalDelete
        isOpen={isOpenModalDelete}
        setIsOpen={setIsOpenModalDelete}
        variant="painting"
        onClickDelete={() => onClickDelete(artistId, _id)}
      />

      <ModalPainting
        isOpen={isOpenModalPaintings}
        setIsOpen={setIsOpenModalPaintings}
        defaultValues={{
          id: _id,
          name,
          yearOfCreation,
          image: image.webp,
        }}
      />
    </>
  )
}
