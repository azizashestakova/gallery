import { FC, useEffect, useState } from "react"
import cn from "classnames/bind"
import { useParams } from "react-router-dom"

import type { IPaintings } from "@/app/models/IArtist"

import { Card } from "@/components/Card"
import { ArtworkMenu } from "@/components/ArtworkMenu"
import { ModalDelete } from "@/components/ModalDelete"

import { artistApi } from "@/services/ArtistService"

import { useAppSelector } from "@/app/hooks"

import { selectIsAuthenticated } from "@/features/auth/authSlice"

import styles from "./CardArtWorks.module.css"

const cx = cn.bind(styles)

interface CardArtWorksProps {
  painting: IPaintings
  index: number
  setIsModalOpen: (value: boolean) => void
  setActiveIndex: (value: number) => void
}

export const CardArtWorks: FC<CardArtWorksProps> = ({
  painting,
  index,
  setIsModalOpen,
  setActiveIndex,
}) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated)

  const { image, name, yearOfCreation, _id } = painting

  const { id: artistId = "" } = useParams()

  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false)

  const onClickButton = (index: number) => {
    setIsModalOpen(true)
    setActiveIndex(index)
  }

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isShowGear, setIsShowGear] = useState<boolean>(false)

  const [deletePainting, isSuccess] = artistApi.useDeletePaintingMutation()

  const onClickDelete = (artistId: string, paintingId: string) => {
    deletePainting({ artistId, paintingId })
  }

  useEffect(() => {
    if (isSuccess) {
      setIsOpenModalDelete(false)
    }
  }, [isSuccess])

  return (
    <>
      <div
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
        />
        <button
          className={cx("button")}
          type="button"
          onClick={() => onClickButton(index)}
        >
          <Card
            imageSet={image}
            name={name}
            yearsOfLife={yearOfCreation}
            id={_id}
          />
        </button>
      </div>
      <ModalDelete
        isOpen={isOpenModalDelete}
        setIsOpen={setIsOpenModalDelete}
        variant="painting"
        onClickDelete={() => onClickDelete(artistId, _id)}
      />
    </>
  )
}
