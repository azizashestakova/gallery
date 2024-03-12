import { FC, useEffect } from "react"
import cn from "classnames/bind"
import { ReactSVG } from "react-svg"
import { useNavigate, useParams } from "react-router-dom"

import { Modal } from "@consta/uikit/Modal"
import { Text } from "@consta/uikit/Text"

import { Button } from "@/components/Button"

import { artistApi } from "@/services/ArtistService"

import ClearIcon from "@/assets/clear.svg"
import DeleteIcon from "@/assets/delete.svg"

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

  return (
    <Modal
      isOpen={isOpen}
      onClickOutside={() => {
        setIsOpen(false)
      }}
      onEsc={() => {
        setIsOpen(false)
      }}
      className={cx("modal")}
    >
      <button
        className={cx("button-close")}
        type="button"
        onClick={() => setIsOpen(false)}
      >
        <ReactSVG src={ClearIcon} />
      </button>
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
          className={cx("button", "button-delete")}
          form="round"
          onClick={onClickDelete}
        />
        <Button
          label="Cancel"
          className={cx("button")}
          view="ghost"
          onClick={() => {
            setIsOpen(false)
          }}
        />
      </div>
    </Modal>
  )
}
