import { FC, useRef } from "react"
import cn from "classnames/bind"
import { useParams } from "react-router-dom"

import { ContextMenu } from "@consta/uikit/ContextMenu"

import GearIcon from "@/assets/gear.svg"
import { Button } from "@/components/Button"
import { artistApi } from "@/services/ArtistService"
import { IconCustom } from "@/utils/icon"

import type { MenuItem } from "./types"

import styles from "./ArtworkMenu.module.scss"
import { menu } from "./constants"

const cx = cn.bind(styles)

interface ActionBarProps {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
  isShowGear: boolean
  setIsShowGear: (value: boolean) => void
  setIsOpenModalDelete: (value: boolean) => void
  setIsOpenModalPaintings: (value: boolean) => void
  paintingId: string
}

export const ArtworkMenu: FC<ActionBarProps> = ({
  isOpen,
  setIsOpen,
  isShowGear,
  setIsShowGear,
  setIsOpenModalDelete,
  setIsOpenModalPaintings,
  paintingId,
}) => {
  const { id: artistId = "" } = useParams()

  const { data: artist } = artistApi.useFetchArtistQuery({ id: artistId })
  const [editMainPainting] = artistApi.useEditArtistMainPaintingMutation()

  const ref = useRef(null)

  const handleToggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const getItemLabel = (item: MenuItem) => item.text

  return (
    <div className={cx("wrapper")}>
      <Button
        ref={ref}
        view="clear"
        onlyIcon
        iconLeft={IconCustom(GearIcon)}
        label="Open menu"
        onClick={handleToggleMenu}
        className={cx("button-gear", {
          "button-gear-show": isShowGear,
        })}
      />
      <ContextMenu
        className={cx("menu")}
        isOpen={isOpen}
        items={menu(
          setIsOpenModalDelete,
          setIsOpen,
          setIsShowGear,
          setIsOpenModalPaintings,
          paintingId,
          editMainPainting,
          artistId,
          artist,
        )}
        getItemLabel={getItemLabel}
        anchorRef={ref}
        direction="downStartLeft"
        size="s"
        offset="2xs"
      />
    </div>
  )
}
