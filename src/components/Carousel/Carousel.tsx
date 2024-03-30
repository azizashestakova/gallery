import { FC } from "react"
import cn from "classnames/bind"
import { useParams } from "react-router-dom"
import Slider from "react-slick"

import { reactSlickAdapter } from "@consta/react-slick-adapter/reactSlickAdapter"
import { Grid } from "@consta/uikit/Grid"
import { Text } from "@consta/uikit/Text"
import { useBreakpoints } from "@consta/uikit/useBreakpoints"

import { useAppSelector } from "@/app/hooks"
import CoverIcon from "@/assets/cover.svg"
import DeleteIcon from "@/assets/delete.svg"
import EditIcon from "@/assets/edit.svg"
import { Button } from "@/components/Button"
import { Image } from "@/components/Image"
import { selectIsAuthenticated } from "@/features/auth/authSlice"
import { artistApi } from "@/services/ArtistService"
import { IconCustom } from "@/utils/icon"

import type { IPaintings } from "@/app/models/IArtist"

import styles from "./Carousel.module.scss"

const cx = cn.bind(styles)

interface CarouselProps {
  paintings: IPaintings[]
  activeIndex: number
  setIsOpenModalDelete: (value: boolean) => void
  setIsOpenModalPainting: (value: boolean) => void
}

export const Carousel: FC<CarouselProps> = ({
  paintings,
  activeIndex,
  setIsOpenModalDelete,
  setIsOpenModalPainting,
}) => {
  const { id: artistId = "" } = useParams()

  const [editMainPainting] = artistApi.useEditArtistMainPaintingMutation()
  const { data: artist } = artistApi.useFetchArtistQuery({ id: artistId })

  const breakpoints = useBreakpoints({
    map: { l: 1280, m: 768 },
    isActive: true,
  })

  const openModalDelete = () => {
    setIsOpenModalDelete(true)
  }

  const openModalEdit = () => {
    setIsOpenModalPainting(true)
  }

  const Arrow = (props: any) => {
    const { className, onClick } = props
    return <div className={cx(className, "arrow")} onClick={onClick} />
  }

  const settings = reactSlickAdapter({
    initialSlide: activeIndex,
    className: cx("carousel"),
    nextArrow: <Arrow />,
    prevArrow: <Arrow />,
  })

  const isAuthenticated = useAppSelector(selectIsAuthenticated)

  const textCover = (id: string) =>
    artist?.mainPainting?._id === id ? "Remove the cover" : "Make the cover"

  const slideNumber = (index: number) => {
    const currentPaintingIndex = index + 1

    const numberOfPaintings = paintings.length

    return `${currentPaintingIndex}/${numberOfPaintings}`
  }

  return (
    <Slider {...settings}>
      {paintings.map(({ yearOfCreation, name, image, _id }, index) => (
        <div className={cx("wrapper")} key={_id}>
          <Button
            label={textCover(_id)}
            className={cx("cover")}
            view="clear"
            iconLeft={IconCustom(CoverIcon)}
            onClick={() => {
              editMainPainting({ artistId, paintingId: _id })
            }}
          />

          <div className={cx("content")}>
            {isAuthenticated && (
              <div className={cx("buttons")}>
                <Button
                  view="clear"
                  onlyIcon
                  iconLeft={IconCustom(EditIcon)}
                  label="Edit"
                  onClick={openModalEdit}
                  className={cx("button")}
                />

                <Button
                  view="clear"
                  onlyIcon
                  iconLeft={IconCustom(DeleteIcon)}
                  label="Delete"
                  onClick={openModalDelete}
                  className={cx("button")}
                />
              </div>
            )}

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

          {image && <Image alt={name} imageSet={image} />}

          <Text
            view="normal"
            size={breakpoints.m ? "3xl" : "m"}
            lineHeight="xs"
            as="span"
            weight="semibold"
            className={cx("count")}
          >
            {slideNumber(index)}
          </Text>
        </div>
      ))}
    </Slider>
  )
}
