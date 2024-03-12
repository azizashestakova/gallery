import { FC, useEffect, useState } from "react"
import cn from "classnames/bind"
import Slider from "react-slick"
import { useParams } from "react-router-dom"

import { useBreakpoints } from "@consta/uikit/useBreakpoints"

import { reactSlickAdapter } from "@consta/react-slick-adapter/reactSlickAdapter"

import { Grid } from "@consta/uikit/Grid"
import { Text } from "@consta/uikit/Text"

import { Image } from "@/components/Card/Image"
import { ModalDelete } from "@/components/ModalDelete"
import { Button } from "@/components/Button"

import { artistApi } from "@/services/ArtistService"

import { IconCustom } from "@/utils/icon"

import DeleteIcon from "@/assets/delete.svg"
import EditIcon from "@/assets/edit.svg"

import type { IPaintings } from "@/app/models/IArtist"

import { useAppSelector } from "@/app/hooks"

import { selectIsAuthenticated } from "@/features/auth/authSlice"

import styles from "./Carousel.module.css"

const cx = cn.bind(styles)

interface CarouselProps {
  paintings: IPaintings[]
  activeIndex: number
  setIsModalOpen: (value: boolean) => void
}

export const Carousel: FC<CarouselProps> = ({
  paintings,
  activeIndex,
  setIsModalOpen,
}) => {
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

  const handleToggleMenu = () => {
    setIsOpenModalDelete(!isOpenModalDelete)
  }

  const settings = reactSlickAdapter({
    arrows: true,
    initialSlide: activeIndex,
    className: cx("carousel"),
  })

  const breakpoints = useBreakpoints({
    map: { l: 1280, m: 768 },
    isActive: true,
  })

  const isAuthenticated = useAppSelector(selectIsAuthenticated)

  return (
    <Slider {...settings}>
      {paintings.map(({ yearOfCreation, name, image, _id }, index) => (
        <div className={cx("wrapper")} key={_id}>
          <div className={cx("content")}>
            {isAuthenticated && (
              <div className={cx("buttons")}>
                <Button
                  view="clear"
                  onlyIcon
                  iconLeft={IconCustom(EditIcon)}
                  label="Delete"
                  onClick={handleToggleMenu}
                  className={cx("button")}
                />
                <Button
                  view="clear"
                  onlyIcon
                  iconLeft={IconCustom(DeleteIcon)}
                  label="Edit"
                  onClick={handleToggleMenu}
                  className={cx("button")}
                />
              </div>
            )}
            <ModalDelete
              isOpen={isOpenModalDelete}
              setIsOpen={setIsOpenModalDelete}
              variant="painting"
              onClickDelete={() => onClickDelete(artistId, _id)}
            />
            <Grid className={cx("wrapper-text")}>
              <Text
                view="secondary"
                size={breakpoints.m ? "xs" : "2xs"}
                lineHeight="xs"
                weight="bold"
                as="span"
                className={cx("year")}
              >
                {yearOfCreation}
              </Text>
              <Text
                view="primary"
                size={breakpoints.m ? "m" : "xs"}
                lineHeight="xs"
                transform="uppercase"
                as="span"
                className={cx("name")}
              >
                {name}
              </Text>
            </Grid>
          </div>
          {image && (
            <Image
              src={image.src}
              src2x={image.src2x}
              webp={image.webp}
              webp2x={image.webp2x}
              alt={name}
            />
          )}
          <Text
            view="normal"
            size={breakpoints.m ? "3xl" : "m"}
            lineHeight="xs"
            as="span"
            weight="semibold"
            className={cx("count")}
          >
            {index + 1}/{paintings.length}
          </Text>
        </div>
      ))}
    </Slider>
  )
}
