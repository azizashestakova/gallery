import { FC, useState } from "react"
import cn from "classnames/bind"

import { useBreakpoints } from "@consta/uikit/useBreakpoints"

import { Grid } from "@consta/uikit/Grid"
import { Text } from "@consta/uikit/Text"

import { CardsArtWorks } from "@/components/CardsArtWorks"
import { ModalFull } from "@/components/Modal/ModalFull"

import type { IPaintings } from "@/app/models/IArtist"

import styles from "./ArtWorks.module.css"

const cx = cn.bind(styles)

interface ArtWorksProps {
  paintings: IPaintings[]
  isSuccess: boolean
}

export const ArtWorks: FC<ArtWorksProps> = ({ paintings, isSuccess }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  const breakpoints = useBreakpoints({
    map: { l: 576 },
    isActive: true,
  })

  return (
    <Grid as="article" className={cx("wrapper")}>
      <Text
        view="secondary"
        size={breakpoints.l ? "5xl" : "3xl"}
        lineHeight={breakpoints.l ? "xs" : "2xs"}
        as="h2"
        className={cx("title")}
      >
        Artworks
      </Text>
      <ModalFull
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        paintings={paintings}
        activeIndex={activeIndex}
      />
      <CardsArtWorks
        paintings={paintings}
        setIsModalOpen={setIsModalOpen}
        setActiveIndex={setActiveIndex}
        isSuccess={isSuccess}
      />
    </Grid>
  )
}
