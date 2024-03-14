import { FC, useState } from "react"
import cn from "classnames/bind"

import { useBreakpoints } from "@consta/uikit/useBreakpoints"

import { Grid } from "@consta/uikit/Grid"
import { Text } from "@consta/uikit/Text"

import { CardsArtWorks } from "@/components/CardsArtWorks"
import { ModalFull } from "@/components/Modal/ModalFull"
import { ActionBar } from "@/components/ActionBar"
import { Button } from "@/components/Button"
import { ModalPaint } from "@/components/ModalPaint"

import type { IPaintings } from "@/app/models/IArtist"

import PlusIcon from "@/assets/plus.svg"

import styles from "./ArtWorks.module.css"
import { useAppSelector } from "@/app/hooks"
import { selectIsAuthenticated } from "@/features/auth/authSlice"
import { IconCustom } from "@/utils/icon"

const cx = cn.bind(styles)

interface ArtWorksProps {
  paintings: IPaintings[]
  isSuccess: boolean
}

export const ArtWorks: FC<ArtWorksProps> = ({ paintings, isSuccess }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [paintingId, setPaintingId] = useState("")
  const [isOpenModalPaint, setIsOpenModalPaint] = useState(false)

  const isAuthenticated = useAppSelector(selectIsAuthenticated)

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
      {isAuthenticated ? (
        <ActionBar>
          <Button
            label="Add picture"
            className={cx("button")}
            view="ghost"
            iconLeft={IconCustom(PlusIcon)}
            onClick={() => {
              setIsOpenModalPaint(true)
            }}
          />
          <ModalPaint
            isOpen={isOpenModalPaint}
            setIsOpen={setIsOpenModalPaint}
          />
        </ActionBar>
      ) : null}
      <ModalFull
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
        isSuccess={isSuccess}
        setPaintingId={setPaintingId}
      />
    </Grid>
  )
}
