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

import { Modal } from "@consta/uikit/Modal"
import { Text } from "@consta/uikit/Text"
import { TextField } from "@consta/uikit/TextField"
import { Combobox } from "@consta/uikit/Combobox"

import { Button } from "@/components/Button"

import { artistApi } from "@/services/ArtistService"
import { genresApi } from "@/services/GenresServices"

import { getBase64 } from "@/utils/getBase64"

import { IconCustom } from "@/utils/icon"

import ClearIcon from "@/assets/clear.svg"
import PersonIcon from "@/assets/person.svg"
import DeleteIcon from "@/assets/delete.svg"

import type { IGenre } from "@/app/models/IGenres"

import styles from "./ModalArtist.module.css"

const initialState = {
  name: "",
  yearsOfLife: "",
  description: "",
  genres: null,
}

const cx = cn.bind(styles)

interface ModalArtistProps {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
}

export const ModalArtist: FC<ModalArtistProps> = ({ isOpen, setIsOpen }) => {
  const { data: genresData = [] } = genresApi.useFetchGenresQuery(null)

  const [isDraggable, setIsDraggable] = useState(false)
  const [image, setImage] = useState("")

  const [formValue, setFormValue] = useState(initialState)

  const { name, yearsOfLife, description, genres } = formValue

  const getItemLabel = (item: any) => item.name
  const getItemKey = (item: any) => item._id

  const handleChange = (
    value: SetStateAction<string | null> | IGenre[],
    field: "name" | "yearsOfLife" | "description" | "genres",
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

  function allowDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault()

    setIsDraggable(true)
  }

  function drop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault()

    var data = e.dataTransfer.files?.[0]
    uploadImage(data)

    setIsDraggable(false)
  }

  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleChangeImage = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      await uploadImage(file)
    },
    [],
  )

  const handleLoadImage = () => inputRef.current?.click()

  const handleDeleteImage = () => setImage("")

  return (
    <Modal
      isOpen={isOpen}
      // TODO:: при закрытии Snackbar закрывается модалка
      onClickOutside={(e) => {
        if ((e.target as HTMLElement).classList.contains("Modal-Overlay")) {
          setIsOpen(false)
        }
      }}
      onEsc={() => {
        setIsOpen(false)
      }}
      className={cx("modal")}
      onDrop={(event) => drop(event)}
      onDragOver={(event) => allowDrop(event)}
    >
      <button
        className={cx("button-close")}
        type="button"
        onClick={() => setIsOpen(false)}
      >
        <ReactSVG src={ClearIcon} />
      </button>

      {isDraggable && (
        <div
          className={cx("dnd-fields-hover")}
          onDragLeave={() => setIsDraggable(false)}
        >
          <ReactSVG src={PersonIcon} className={cx("person")} />
          <Text
            view="primary"
            size="m"
            lineHeight="2xs"
            weight="light"
            as="span"
            className={cx("title")}
          >
            Drop your image here
          </Text>
          <Text
            view="primary"
            size="xs"
            lineHeight="2xs"
            weight="light"
            as="span"
            className={cx("text")}
          >
            Upload only .jpg or .png format less than 3 MB
          </Text>
        </div>
      )}
      <div className={cx("loading")}>
        <div
          className={cx("loading-field", { "loading-field-active": image })}
          onClick={handleLoadImage}
        >
          {image ? (
            <>
              <img className={cx("image")} src={image} alt="avatar" />

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
              <ReactSVG src={PersonIcon} className={cx("person")} />
              <Text
                view="primary"
                size="m"
                lineHeight="2xs"
                weight="light"
                as="span"
                className={cx("loading-field-text")}
              >
                You can drop your image here
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
          label="Browse Profile Photo"
          view="ghost"
          className={cx("button-loading")}
          onClick={handleLoadImage}
        />
      </div>
      <div className={cx("form")}>
        <TextField
          className={cx("field")}
          onChange={(value) => handleChange(value, "name")}
          value={name}
          type="text"
          label="Name"
          labelPosition="top"
          required
          status="warning"
          caption="Это подпись"
        />
        <TextField
          className={cx("field")}
          onChange={(value) => handleChange(value, "yearsOfLife")}
          value={yearsOfLife}
          type="text"
          label="Years of life"
          labelPosition="top"
          required
        />
        <TextField
          className={cx("field")}
          onChange={(value) => handleChange(value, "description")}
          value={description}
          type="textarea"
          label="Description"
          labelPosition="top"
          required
          minRows={6}
        />
        <Combobox
          className={cx("combobox")}
          dropdownClassName={cx("combobox-dropdown")}
          size="m"
          label="Genres"
          items={genresData}
          getItemLabel={getItemLabel}
          getItemKey={getItemKey}
          value={genres}
          onChange={(value) => handleChange(value, "genres")}
          multiple
          status="warning"
          caption="Это подпись"
        />
        <Button
          label="Save"
          className={cx("button")}
          form="round"
          onClick={onClickSave}
          disabled={
            name && yearsOfLife && description && genres?.length ? false : true
          }
        />
      </div>
    </Modal>
  )
}
