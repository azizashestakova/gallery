import {
  ChangeEvent,
  DragEvent,
  FC,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"
import { yupResolver } from "@hookform/resolvers/yup"
import cn from "classnames/bind"
import { useForm, Controller, useController } from "react-hook-form"
import { useParams } from "react-router-dom"
import { ReactSVG } from "react-svg"
import * as yup from "yup"

import { Combobox } from "@consta/uikit/Combobox"
import { Modal } from "@consta/uikit/Modal"
import { Text } from "@consta/uikit/Text"
import { TextField } from "@consta/uikit/TextField"

import ClearIcon from "@/assets/clear.svg"
import DeleteIcon from "@/assets/delete.svg"
import PersonIcon from "@/assets/person.svg"
import { Button } from "@/components/Button"
import { artistApi } from "@/services/ArtistService"
import { genresApi } from "@/services/GenresServices"
import { getBase64 } from "@/utils/getBase64"
import { IconCustom } from "@/utils/icon"

import type { IGenre } from "@/app/models/IGenres"

import styles from "./ModalArtist.module.css"

const schema = yup.object({
  name: yup.string().trim().required("This field is required."),
  yearsOfLife: yup.string().trim().required("This field is required."),
  description: yup.string().trim().required("This field is required."),
  genres: yup
    .array()
    .min(1)
    .of(
      yup.object().shape({
        _id: yup.string().required(),
        name: yup.string().required(),
      }),
    )
    .required("This field is required."),
  avatar: yup.mixed(),
})

const cx = cn.bind(styles)

export type TDefaultValues = {
  name: string
  yearsOfLife: string
  description: string
  genres: IGenre[]
  avatar: string
}

interface ModalArtistProps {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
  defaultValues?: TDefaultValues
}

const initialState = {
  name: "",
  yearsOfLife: "",
  description: "",
  genres: [],
  avatar: "",
}

export const ModalArtist: FC<ModalArtistProps> = ({
  isOpen,
  setIsOpen,
  defaultValues = initialState,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
    mode: "onChange",
  })

  const { id: artistId = "" } = useParams()

  const name = "avatar"
  const { field } = useController({ name, control })

  const [editArtist, { isSuccess: isEditSuccess }] =
    artistApi.useEditArtistMutation()
  const [createArtist, { isSuccess: isCreateSuccess }] =
    artistApi.useCreateArtistMutation()

  const isSuccess = isEditSuccess || isCreateSuccess

  useEffect(() => {
    if (isSuccess) {
      setIsOpen(false)
    }
  }, [isSuccess, setIsOpen])

  const { data: genresData = [] } = genresApi.useFetchGenresQuery(null)

  const [isDraggable, setIsDraggable] = useState(false)

  const API_BASE_URL = import.meta.env.VITE__API_BASE_URL

  const currentImage = defaultValues.avatar as string

  const [image, setImage] = useState(
    currentImage ? `${API_BASE_URL}${currentImage}` : "",
  )

  const getItemLabel = (item: any) => item.name
  const getItemKey = (item: any) => item._id

  const uploadImage = async (file: File | undefined) => {
    if (
      file &&
      file.size <= 3e6 &&
      (file.type === "image/jpeg" || file.type === "image/png")
    ) {
      const base64 = await getBase64(file)
      setImage(base64)
      field.onChange(file)
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

  const handleDeleteImage = () => {
    setImage("")

    field.onChange("") // TODO:: оставить или убрать?
  }

  const onSubmit = handleSubmit(
    async ({ name, yearsOfLife, description, genres, avatar }) => {
      const currentImg = avatar as File

      const data = new FormData()
      data.append("name", name)
      data.append("yearsOfLife", yearsOfLife)
      data.append("description", description)

      // TODO:: можно отправить только один жанр
      data.append("genres", genres.map((genre) => genre._id).join(", "))

      if (currentImg?.name) {
        data.append("avatar", currentImg)
      }

      if (artistId) {
        await editArtist({ artistId, data })
      } else {
        await createArtist(data)
      }
    },
  )

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset"
  }, [isOpen])

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
      <Button
        label="Close"
        className={cx("button-close")}
        view="ghost"
        iconLeft={IconCustom(ClearIcon)}
        onlyIcon
        onClick={() => setIsOpen(false)}
      />
      <form className={cx("form")} onSubmit={onSubmit}>
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
                  view="clear"
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
            onClick={handleLoadImage}
          />
        </div>
        {/* TODO:: поменять название класса */}
        <div className={cx("fields")}>
          <Controller
            name="name"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                {...field}
                className={cx("field")}
                type="text"
                label="Name"
                labelPosition="top"
                required
                status={
                  errors.name?.message?.toString() ? "warning" : undefined
                }
                caption={errors.name?.message?.toString()}
              />
            )}
          />
          <Controller
            name="yearsOfLife"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                {...field}
                className={cx("field")}
                type="text"
                label="Years of life"
                labelPosition="top"
                required
                status={
                  errors.yearsOfLife?.message?.toString()
                    ? "warning"
                    : undefined
                }
                caption={errors.yearsOfLife?.message?.toString()}
              />
            )}
          />
          <Controller
            name="description"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                {...field}
                className={cx("field")}
                type="textarea"
                label="Description"
                labelPosition="top"
                minRows={6}
                required
                status={
                  errors.description?.message?.toString()
                    ? "warning"
                    : undefined
                }
                caption={errors.description?.message?.toString()}
              />
            )}
          />
          <Controller
            name="genres"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Combobox
                {...field}
                className={cx("combobox")}
                dropdownClassName={cx("combobox-dropdown")}
                size="m"
                label="Genres"
                items={genresData}
                getItemLabel={getItemLabel}
                getItemKey={getItemKey}
                multiple
                status={
                  errors.genres?.message?.toString() ? "warning" : undefined
                }
                caption={errors.genres?.message?.toString()}
              />
            )}
          />
          <Button
            label="Save"
            className={cx("button")}
            form="round"
            type="submit"
            disabled={!isValid}
          />
        </div>
      </form>
    </Modal>
  )
}
