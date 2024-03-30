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
  setIsOpenModalCarousel: (value: boolean) => void
  setActiveIndex: (value: number) => void
  setPaintingId: (value: string) => void
}

export const CardArtWorks: FC<CardArtWorksProps> = ({
  painting,
  index,
  setIsOpenModalCarousel,
  setActiveIndex,
  setPaintingId,
}) => {
  const { image, name, yearOfCreation, _id } = painting

  const [deletePainting, isSuccess] = artistApi.useDeletePaintingMutation()

  const isAuthenticated = useAppSelector(selectIsAuthenticated)

  const { id: artistId = "" } = useParams()

  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false)
  const [isOpenModalPainting, setIsOpenModalPainting] = useState(false)
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false)
  const [isShowGear, setIsShowGear] = useState<boolean>(false)

  useEffect(() => {
    if (isSuccess) {
      setIsOpenModalDelete(false)
    }
  }, [isSuccess])

  const openModalCarousel = (index: number) => {
    setIsOpenModalCarousel(true)
    setActiveIndex(index)
    setPaintingId(_id)
  }

  return (
    <>
      <div
        className={cx("wrapper")}
        onMouseLeave={() => {
          setIsShowGear(false)
          setIsOpenMenu(false)
        }}
        onMouseEnter={() => {
          if (isAuthenticated) {
            setIsShowGear(true)
          }
        }}
      >
        <ArtworkMenu
          isOpen={isOpenMenu}
          setIsOpen={setIsOpenMenu}
          isShowGear={isShowGear}
          setIsShowGear={setIsShowGear}
          setIsOpenModalDelete={setIsOpenModalDelete}
          setIsOpenModalPainting={setIsOpenModalPainting}
          paintingId={painting._id}
        />

        <button
          className={cx("button")}
          type="button"
          onClick={() => openModalCarousel(index)}
        >
          <Card imageSet={image} name={name} yearsOfLife={yearOfCreation} />
        </button>
      </div>

      <ModalDelete
        isOpenModalDelete={isOpenModalDelete}
        setIsOpenModalDelete={setIsOpenModalDelete}
        variant="painting"
        onClickDelete={() => deletePainting({ artistId, paintingId: _id })}
      />

      <ModalPainting
        isOpenModalPainting={isOpenModalPainting}
        setIsOpenModalPainting={setIsOpenModalPainting}
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
