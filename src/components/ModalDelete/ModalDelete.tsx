import { FC } from "react"
import cn from "classnames/bind"
import { ReactSVG } from "react-svg"

import { Text } from "@consta/uikit/Text"

import ClearIcon from "@/assets/clear.svg"
import DeleteIcon from "@/assets/delete.svg"
import { Button } from "@/components/Button"
import { Modal } from "@/components/Modal"
import { IconCustom } from "@/utils/icon"

import { text } from "./constants"
import styles from "./ModalDelete.module.scss"

const cx = cn.bind(styles)

interface ModalDeleteProps {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
  variant: "artist" | "painting"
  onClickDelete: () => void
}

export const ModalDelete: FC<ModalDeleteProps> = ({
  isOpen,
  setIsOpen,
  variant,
  onClickDelete,
}) => {
  return (
    <Modal
      isModalOpen={isOpen}
      setIsModalOpen={setIsOpen}
      className={cx("modal")}
      hasOverlay
    >
      <Button
        label="Close"
        view="ghost"
        onlyIcon
        iconLeft={IconCustom(ClearIcon)}
        className={cx("button-close")}
        onClick={() => setIsOpen(false)}
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
            setIsOpen(false)
          }}
        />
      </div>
    </Modal>
  )
}
