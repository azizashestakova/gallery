import { FC, useState } from "react"
import cn from "classnames/bind"

import { useBreakpoints } from "@consta/uikit/useBreakpoints"

import { Grid } from "@consta/uikit/Grid"
import { Text } from "@consta/uikit/Text"

import { CardsArtWorks } from "@/components/CardsArtWorks"
import { Modal } from "@/components/Modal"

import type { IPaintings } from "@/app/models/IArtist"

import styles from "./ArtWorks.module.css"

const cx = cn.bind(styles)

interface ArtWorksProps {
  paintings: IPaintings[]
}

export const ArtWorks: FC<ArtWorksProps> = ({ paintings }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  const breakpoints = useBreakpoints({
    map: { l: 576 },
    isActive: true,
  })

  return (
    <Grid as="article">
      <Text
        view="secondary"
        size={breakpoints.l ? "5xl" : "3xl"}
        lineHeight={breakpoints.l ? "xs" : "2xs"}
        as="h2"
        className={cx("title")}
      >
        Artworks
      </Text>
      <Modal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        paintings={paintings}
        activeIndex={activeIndex}
      />
      <CardsArtWorks
        paintings={paintings}
        setIsModalOpen={setIsModalOpen}
        setActiveIndex={setActiveIndex}
      />
    </Grid>
  )
}
