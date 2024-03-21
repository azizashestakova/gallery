import { FC, MouseEventHandler, useRef } from "react"
import cn from "classnames/bind"
import { useParams } from "react-router-dom"

import { Button } from "@consta/uikit/Button"
import { ContextMenu } from "@consta/uikit/ContextMenu"

import GearIcon from "@/assets/gear.svg"
import { artistApi } from "@/services/ArtistService"
import { IconCustom } from "@/utils/icon"

import styles from "./ArtworkMenu.module.css"

const cx = cn.bind(styles)

interface ActionBarProps {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
  isShowGear: boolean
  setIsShowGear: (value: boolean) => void
  setIsOpenModalDelete: (value: boolean) => void
  setIsOpenModalPaint: (value: boolean) => void
  paintingId: string
}

export const ArtworkMenu: FC<ActionBarProps> = ({
  isOpen,
  setIsOpen,
  isShowGear,
  setIsShowGear,
  setIsOpenModalDelete,
  setIsOpenModalPaint,
  paintingId,
}) => {
  const ref = useRef(null)

  const handleToggleMenu = () => {
    setIsOpen(!isOpen)
  }

  interface IItem {
    text: string
    onClick: MouseEventHandler<HTMLButtonElement>
  }

  const getItemLabel = (item: IItem) => item.text

  const [editMainPainting] = artistApi.useEditArtistMainPaintingMutation()

  const { id: artistId = "" } = useParams()

  const { data: artist } = artistApi.useFetchArtistQuery({ id: artistId })

  const items = [
    {
      text: "Delete",
      onClick: () => {
        setIsOpenModalDelete(true)
        setIsOpen(false)
        setIsShowGear(false)
      },
    },
    {
      text: "Edit",
      onClick: () => {
        setIsOpenModalPaint(true)
        setIsOpen(false)
        setIsShowGear(false)
      },
    },
    {
      text:
        artist.mainPainting?._id === paintingId
          ? "Remove the cover"
          : "Make the cover",
      onClick: () => {
        editMainPainting({ artistId, paintingId })
        setIsOpen(false)
      },
    },
  ]

  return (
    <div className={cx("wrapper")}>
      <Button
        ref={ref}
        view="ghost"
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
        items={items}
        getItemLabel={getItemLabel}
        anchorRef={ref}
        direction="downStartLeft"
        size="s"
        offset="2xs"
      />
    </div>
  )
}
