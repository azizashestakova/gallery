import { DragEvent, FC, useContext, useEffect, useState } from "react"
import { yupResolver } from "@hookform/resolvers/yup"
import cn from "classnames/bind"
import { useController, useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"

import { useAppSelector } from "@/app/hooks"
import { Button } from "@/components/Button"
import { Field } from "@/components/Field"
import { HoverArea } from "@/components/ModalArtist/HoverArea"
import { ImageField } from "@/components/ModalArtist/ImageField"
import { Select } from "@/components/Select"
import { limit } from "@/constants"
import { FilterContext } from "@/context/FilterProvider"
import { selectIsAuthenticated } from "@/features/auth/authSlice"
import { schema } from "@/schemas/ArtistSchema"
import { artistApi } from "@/services/ArtistService"
import { getBase64 } from "@/utils/getBase64"

import type { IDefaultValues } from "@/components/ModalArtist/types"

import styles from "./ArtistForm.module.scss"

const cx = cn.bind(styles)

const initialState = {
  name: "",
  yearsOfLife: "",
  description: "",
  genres: [],
  avatar: "",
}

interface ArtistFormProps {
  setIsOpenModalArtist: (value: boolean) => void
  defaultValues?: IDefaultValues
}

export const ArtistForm: FC<ArtistFormProps> = ({
  setIsOpenModalArtist,
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

  const navigate = useNavigate()

  const name = "avatar"
  const { field } = useController({ name, control })

  const isAuthenticated = useAppSelector(selectIsAuthenticated)

  const { filters } = useContext(FilterContext)

  const params = { ...filters, genres: filters.genres?.split(",") }

  const [editArtist, { isSuccess: isEditSuccess }] =
    artistApi.useEditArtistMutation()
  const [createArtist, { isSuccess: isCreateSuccess }] =
    artistApi.useCreateArtistMutation()
  const { data: { meta } = {} } = artistApi.useFetchAllArtistsQuery({
    isAuthenticated,
    params,
  })

  const pageNumber = Math.ceil((meta?.count || 0) / limit)

  const isSuccess = isEditSuccess || isCreateSuccess

  useEffect(() => {
    if (isSuccess) {
      setIsOpenModalArtist(false)
      navigate(`/?perPage=${limit}&pageNumber=${pageNumber}`)
    }
  }, [isSuccess, navigate, pageNumber, setIsOpenModalArtist])

  const [isDraggable, setIsDraggable] = useState(false)

  const API_BASE_URL = import.meta.env.VITE__API_BASE_URL

  const currentImage = defaultValues.avatar

  const [image, setImage] = useState(
    currentImage ? `${API_BASE_URL}${currentImage}` : "",
  )

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

  const allowDrop = (e: DragEvent<HTMLFormElement>) => {
    e.preventDefault()

    setIsDraggable(true)
  }

  const drop = (e: DragEvent<HTMLFormElement>) => {
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
    <form
      className={cx("form")}
      onSubmit={onSubmit}
      onDrop={(event) => drop(event)}
      onDragOver={(event) => allowDrop(event)}
    >
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
        <Select error={errors.genres?.message?.toString()} control={control} />
        <Button label="Save" form="round" type="submit" disabled={!isValid} />
      </div>
    </form>
  )
}
