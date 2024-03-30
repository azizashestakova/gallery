import { FC } from "react"
import cn from "classnames/bind"

import ClearIcon from "@/assets/clear.svg"
import { Button } from "@/components/Button"
import { Modal } from "@/components/Modal"
import { IconCustom } from "@/utils/icon"

import type { IDefaultValues } from "./types"

import { ArtistForm } from "./ArtistForm"
import styles from "./ModalArtist.module.scss"

const cx = cn.bind(styles)

interface ModalArtistProps {
  isOpenModalArtist: boolean
  setIsOpenModalArtist: (value: boolean) => void
  defaultValues?: IDefaultValues
}

export const ModalArtist: FC<ModalArtistProps> = ({
  isOpenModalArtist,
  setIsOpenModalArtist,
  defaultValues,
}) => {
  return (
    <Modal
      isOpenModal={isOpenModalArtist}
      setIsOpenModal={setIsOpenModalArtist}
      className={cx("modal")}
      hasOverlay
    >
      <Button
        label="Close"
        className={cx("button-close")}
        view="ghost"
        iconLeft={IconCustom(ClearIcon)}
        onlyIcon
        onClick={() => setIsOpenModalArtist(false)}
      />
      <ArtistForm
        setIsOpenModalArtist={setIsOpenModalArtist}
        defaultValues={defaultValues}
      />
    </Modal>
  )
}
