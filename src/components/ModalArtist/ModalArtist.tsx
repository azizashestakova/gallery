import { DragEvent, FC, useEffect, useState } from "react"
import { yupResolver } from "@hookform/resolvers/yup"
import cn from "classnames/bind"
import { useForm, Controller, useController } from "react-hook-form"
import { useParams } from "react-router-dom"

import { Combobox } from "@consta/uikit/Combobox"

import ClearIcon from "@/assets/clear.svg"
import { Button } from "@/components/Button"
import { Field } from "@/components/Field"
import { Modal } from "@/components/Modal"
import { HoverArea } from "@/components/ModalArtist/HoverArea"
import { ImageField } from "@/components/ModalArtist/ImageField"
import { schema } from "@/schemas/ArtistSchema"
import { artistApi } from "@/services/ArtistService"
import { genresApi } from "@/services/GenresServices"
import { getBase64 } from "@/utils/getBase64"
import { IconCustom } from "@/utils/icon"

import type { IDefaultValues } from "./types"
import type { IGenre } from "@/app/models/IGenres"

import styles from "./ModalArtist.module.scss"

const cx = cn.bind(styles)

interface ModalArtistProps {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
  defaultValues?: IDefaultValues
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
    mode: "onBlur",
  })

  const { id: artistId = "" } = useParams()

  const name = "avatar"
  const { field } = useController({ name, control })

  const [editArtist, { isSuccess: isEditSuccess }] =
    artistApi.useEditArtistMutation()
  const [createArtist, { isSuccess: isCreateSuccess }] =
    artistApi.useCreateArtistMutation()
  const { data: genresData = [] } = genresApi.useFetchGenresQuery(null)

  const isSuccess = isEditSuccess || isCreateSuccess

  useEffect(() => {
    if (isSuccess) {
      setIsOpen(false)
    }
  }, [isSuccess, setIsOpen])

  const [isDraggable, setIsDraggable] = useState(false)

  const API_BASE_URL = import.meta.env.VITE__API_BASE_URL

  const currentImage = defaultValues.avatar

  const [image, setImage] = useState(
    currentImage ? `${API_BASE_URL}${currentImage}` : "",
  )

  const getItemLabel = (item: IGenre) => item.name
  const getItemKey = (item: IGenre) => item._id

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

  const allowDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()

    setIsDraggable(true)
  }

  const drop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()

    const data = e.dataTransfer.files?.[0]
    uploadImage(data)

    setIsDraggable(false)
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

  return (
    <Modal
      isModalOpen={isOpen}
      setIsModalOpen={setIsOpen}
      className={cx("modal")}
      hasOverlay
    >
      <Button
        label="Close"
        className={cx("button-close")}
        view="ghost"
        iconLeft={IconCustom(ClearIcon)}
        onlyIcon
        onClick={() => setIsOpen(false)}
      />
      <div
        onDrop={(event) => drop(event)}
        onDragOver={(event) => allowDrop(event)}
      >
        <form className={cx("form")} onSubmit={onSubmit}>
          {isDraggable && <HoverArea setIsDraggable={setIsDraggable} />}
          <ImageField
            image={image}
            setImage={setImage}
            uploadImage={uploadImage}
            field={field}
          />
          <div className={cx("fields")}>
            <Field
              name="name"
              control={control}
              type="text"
              label="Name"
              error={errors.name?.message?.toString()}
            />
            <Field
              name="yearsOfLife"
              control={control}
              type="text"
              label="Years of life"
              error={errors.yearsOfLife?.message?.toString()}
            />
            <Field
              name="description"
              control={control}
              type="textarea"
              label="Description"
              error={errors.description?.message?.toString()}
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
              form="round"
              type="submit"
              disabled={!isValid}
            />
          </div>
        </form>
      </div>
    </Modal>
  )
}
