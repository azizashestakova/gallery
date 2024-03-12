import { FC, MouseEventHandler, useRef } from "react"
import cn from "classnames/bind"

import { ContextMenu } from "@consta/uikit/ContextMenu"
import { Button } from "@consta/uikit/Button"

import { IconCustom } from "@/utils/icon"

import GearIcon from "@/assets/gear.svg"

import styles from "./ArtworkMenu.module.css"

const cx = cn.bind(styles)

interface ActionBarProps {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
  isShowGear: boolean
  setIsShowGear: (value: boolean) => void
  setIsOpenModalDelete: (value: boolean) => void
}

export const ArtworkMenu: FC<ActionBarProps> = ({
  isOpen,
  setIsOpen,
  isShowGear,
  setIsShowGear,
  setIsOpenModalDelete,
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
      onClick: () => {},
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
