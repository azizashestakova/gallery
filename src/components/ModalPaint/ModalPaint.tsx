import {
  ChangeEvent,
  DragEvent,
  FC,
  SetStateAction,
  useCallback,
  useRef,
  useState,
} from "react"
import cn from "classnames/bind"
import { ReactSVG } from "react-svg"
import { useNavigate, useParams } from "react-router-dom"

import { useBreakpoints } from "@consta/uikit/useBreakpoints"

import { Modal } from "@consta/uikit/Modal"
import { Text } from "@consta/uikit/Text"
import { TextField } from "@consta/uikit/TextField"

import { Button } from "@/components/Button"

import { getBase64 } from "@/utils/getBase64"

import { IconCustom } from "@/utils/icon"

import ClearIcon from "@/assets/clear.svg"
import MountainsIcon from "@/assets/mountains.svg"
import DeleteIcon from "@/assets/delete.svg"

import type { IGenre } from "@/app/models/IGenres"

import styles from "./ModalPaint.module.css"

const initialState = {
  name: "",
  yearOfCreation: "",
}

const cx = cn.bind(styles)

interface ModalPaintProps {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
}

export const ModalPaint: FC<ModalPaintProps> = ({ isOpen, setIsOpen }) => {
  const breakpoints = useBreakpoints({
    map: { m: 768 },
    isActive: true,
  })

  const [image, setImage] = useState("")

  const [formValue, setFormValue] = useState(initialState)

  const { name, yearOfCreation } = formValue

  const handleChange = (
    value: SetStateAction<string | null> | IGenre[],
    field: "name" | "yearOfCreation",
  ) => {
    setFormValue({ ...formValue, [field]: value })
  }
  // const [deleteArtist, { isSuccess }] = artistApi.useDeleteArtistMutation()

  // const navigate = useNavigate()

  // const { id = "" } = useParams()

  // useEffect(() => {
  //   if (isSuccess) {
  //     setIsOpen(false)
  //     navigate("/") // TODO:: Добавить параметры??
  //   }
  // }, [isSuccess, navigate, setIsOpen])

  const onClickSave = () => {
    // deleteArtist(id)
  }

  const uploadImage = async (file: File | undefined) => {
    if (
      file &&
      file.size <= 3e6 &&
      (file.type === "image/jpeg" || file.type === "image/png")
    ) {
      const base64 = await getBase64(file)
      setImage(base64)
      // field.onChange(file);
    }
  }

  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleChangeImage = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      await uploadImage(file)
    },
    [],
  )

  function allowDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault()
  }

  function drop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault()

    var data = e.dataTransfer.files?.[0]
    uploadImage(data)
  }

  const handleLoadImage = () => inputRef.current?.click()

  const handleDeleteImage = () => setImage("")

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
      <div className={cx("form")}>
        <div className={cx("fields")}>
          <TextField
            className={cx("field")}
            onChange={(value) => handleChange(value, "name")}
            value={name}
            type="text"
            label="The name of the picture"
            labelPosition="top"
            required
            status="warning"
            caption="Это подпись"
          />
          <TextField
            className={cx("field", "field-year")}
            onChange={(value) => handleChange(value, "yearOfCreation")}
            value={yearOfCreation}
            type="number"
            label="Year of creation"
            labelPosition="top"
            required
          />
        </div>{" "}
        <div
          onDrop={(event) => drop(event)}
          onDragOver={(event) => allowDrop(event)}
          className={cx("loading", { "loading-active": image })}
          onClick={handleLoadImage}
        >
          {image ? (
            <>
              <img src={image} alt="avatar" />

              <Button
                label="Delete image"
                view="ghost"
                onlyIcon
                iconLeft={IconCustom(DeleteIcon)}
                className={cx("button-delete")}
                onClick={handleDeleteImage}
              />
            </>
          ) : (
            <>
              <ReactSVG src={MountainsIcon} className={cx("mountain")} />
              <Text
                view="primary"
                size="m"
                lineHeight="2xs"
                weight="light"
                as="span"
                className={cx("loading-field-title")}
              >
                Drop your image here, or
              </Text>
              <Text
                view="primary"
                size="m"
                lineHeight="2xs"
                weight="medium"
                as="span"
                className={cx("loading-field-link")}
              >
                {breakpoints.m ? "browse" : "browse image"}
              </Text>
              <Text
                view="primary"
                size="xs"
                lineHeight="xs"
                weight="light"
                as="span"
                className={cx("loading-field-text")}
              >
                Upload only .jpg or .png format less than 3 MB
              </Text>
              <input
                className={cx("input")}
                type="file"
                accept="image/jpeg,image/png"
                ref={inputRef}
                onChange={handleChangeImage}
              />
            </>
          )}
        </div>
        <Button
          label="Save"
          className={cx("button")}
          form="round"
          onClick={onClickSave}
          disabled={name && yearOfCreation ? false : true}
        />
      </div>
    </Modal>
  )
}
