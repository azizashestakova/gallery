import { FC } from "react"
import cn from "classnames/bind"
import Slider from "react-slick"

import { useBreakpoints } from "@consta/uikit/useBreakpoints"

import { reactSlickAdapter } from "@consta/react-slick-adapter/reactSlickAdapter"

import { Grid } from "@consta/uikit/Grid"
import { Text } from "@consta/uikit/Text"

import { Image } from "@/components/Card/Image"

import type { IPaintings } from "@/app/models/IArtist"

import styles from "./Carousel.module.css"

const cx = cn.bind(styles)

interface CarouselProps {
  paintings: IPaintings[]
  activeIndex: number
}

export const Carousel: FC<CarouselProps> = ({ paintings, activeIndex }) => {
  const settings = reactSlickAdapter({
    arrows: true,
    initialSlide: activeIndex,
    className: cx("carousel"),
  })

  const breakpoints = useBreakpoints({
    map: { l: 1280, m: 768 },
    isActive: true,
  })

  return (
    <Slider {...settings}>
      {paintings.map(({ yearOfCreation, name, image, _id }, index) => (
        <div className={cx("wrapper")} key={_id}>
          <div className={cx("content")}>
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
