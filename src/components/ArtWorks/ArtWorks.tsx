import { FC, useState } from "react"
import cn from "classnames/bind"

import { Grid } from "@consta/uikit/Grid"
import { Text } from "@consta/uikit/Text"
import { useBreakpoints } from "@consta/uikit/useBreakpoints"

import { useAppSelector } from "@/app/hooks"
import { ActionBar } from "@/components/ActionBar"
import { CardsArtWorks } from "@/components/CardsArtWorks"
import { ModalCarousel } from "@/components/ModalCarousel"
import { PaintingAddButton } from "@/components/PaintingAddButton"
import { selectIsAuthenticated } from "@/features/auth/authSlice"

import type { IPaintings } from "@/app/models/IArtist"

import styles from "./ArtWorks.module.scss"

const cx = cn.bind(styles)

interface ArtWorksProps {
  paintings: IPaintings[]
}

export const ArtWorks: FC<ArtWorksProps> = ({ paintings }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [paintingId, setPaintingId] = useState("")

  const isAuthenticated = useAppSelector(selectIsAuthenticated)

  const breakpoints = useBreakpoints({
    map: { m: 768 },
    isActive: true,
  })

  const isAddButtonVisible = isAuthenticated && paintings.length

  return (
    <Grid as="article" className={cx("wrapper")}>
      <Text
        view="secondary"
        size={breakpoints.m ? "5xl" : "3xl"}
        lineHeight={breakpoints.m ? "xs" : "2xs"}
        as="h2"
        className={cx("title")}
      >
        Artworks
      </Text>
      {isAddButtonVisible ? (
        <ActionBar>
          <PaintingAddButton />
        </ActionBar>
      ) : null}
      <ModalCarousel
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        paintings={paintings}
        activeIndex={activeIndex}
        paintingId={paintingId}
      />
      <CardsArtWorks
        paintings={paintings}
        setIsModalOpen={setIsModalOpen}
        setActiveIndex={setActiveIndex}
        setPaintingId={setPaintingId}
      />
    </Grid>
  )
}
