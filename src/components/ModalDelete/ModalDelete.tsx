import { FC } from "react"
import cn from "classnames/bind"
import { ReactSVG } from "react-svg"

import { Text } from "@consta/uikit/Text"

import ClearIcon from "@/assets/clear.svg"
import DeleteIcon from "@/assets/delete.svg"
import { Button } from "@/components/Button"
import { Modal } from "@/components/Modal"
import { IconCustom } from "@/utils/icon"

import type { Variant } from "./types"

import { text } from "./constants"
import styles from "./ModalDelete.module.scss"

const cx = cn.bind(styles)

interface ModalDeleteProps {
  isOpenModalDelete: boolean
  setIsOpenModalDelete: (value: boolean) => void
  variant: Variant
  onClickDelete: () => void
}

export const ModalDelete: FC<ModalDeleteProps> = ({
  isOpenModalDelete,
  setIsOpenModalDelete,
  variant,
  onClickDelete,
}) => {
  return (
    <Modal
      isOpenModal={isOpenModalDelete}
      setIsOpenModal={setIsOpenModalDelete}
      className={cx("modal")}
      hasOverlay
    >
      <Button
        label="Close"
        view="ghost"
        onlyIcon
        iconLeft={IconCustom(ClearIcon)}
        className={cx("button-close")}
        onClick={() => setIsOpenModalDelete(false)}
      />

      <div className={cx("content")}>
        <ReactSVG src={DeleteIcon} className={cx("icon")} />

        <Text
          view="primary"
          size="m"
          lineHeight="2xs"
          weight="medium"
          as="h2"
          className={cx("title")}
        >
          {text[variant].title}
        </Text>

        <Text
          view="primary"
          size="xs"
          lineHeight="2xs"
          weight="light"
          as="p"
          className={cx("text")}
        >
          {text[variant].description}
        </Text>

        <Button
          label="Delete"
          className={cx("button-delete")}
          form="round"
          onClick={onClickDelete}
        />

        <Button
          label="Cancel"
          view="ghost"
          onClick={() => {
            setIsOpenModalDelete(false)
          }}
        />
      </div>
    </Modal>
  )
}
