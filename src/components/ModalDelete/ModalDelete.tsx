import { FC, useEffect } from "react"
import cn from "classnames/bind"
import { ReactSVG } from "react-svg"

import { Modal } from "@consta/uikit/Modal"
import { Text } from "@consta/uikit/Text"

import ClearIcon from "@/assets/clear.svg"
import DeleteIcon from "@/assets/delete.svg"
import { Button } from "@/components/Button"
import { IconCustom } from "@/utils/icon"

import styles from "./ModalDelete.module.css"

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
  const text = {
    artist: {
      title: "Do you want to delete this artist profile?",
      description: "You will not be able to recover this profile afterwards.",
    },
    painting: {
      title: "Do you want to delete this picture?",
      description: "You will not be able to recover this picture afterwards.",
    },
  }

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset"
  }, [isOpen])

  return (
    <Modal
      isOpen={isOpen}
      onClickOutside={(e) => {
        if ((e.target as HTMLElement).classList.contains("Modal-Overlay")) {
          setIsOpen(false)
        }
      }}
      onEsc={() => {
        setIsOpen(false)
      }}
      className={cx("modal")}
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
