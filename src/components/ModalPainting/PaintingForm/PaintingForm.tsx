import { FC, useEffect } from "react"
import { yupResolver } from "@hookform/resolvers/yup"
import cn from "classnames/bind"
import { useForm } from "react-hook-form"
import { useParams } from "react-router-dom"

import { Button } from "@/components/Button"
import { Field } from "@/components/Field"
import { ImageField } from "@/components/ModalPainting/ImageField"
import { schema } from "@/schemas/PaintingSchema"
import { artistApi } from "@/services/ArtistService"

import type { IDefaultValues } from "../types"

import styles from "./PaintingForm.module.scss"

const cx = cn.bind(styles)

const initialState = {
  id: "",
  name: "",
  yearOfCreation: "",
  image: "",
}

interface PaintingFormProps {
  defaultValues?: IDefaultValues
  setIsOpen: (value: boolean) => void
}

export const PaintingForm: FC<PaintingFormProps> = ({
  defaultValues = initialState,
  setIsOpen,
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

  const [editPainting, { isSuccess: isEditSuccess }] =
    artistApi.useEditPaintingMutation()
  const [createPainting, { isSuccess: isCreateSuccess }] =
    artistApi.useCreatePaintingMutation()

  const isSuccess = isEditSuccess || isCreateSuccess

  useEffect(() => {
    if (isSuccess) {
      setIsOpen(false)
    }
  }, [isSuccess, setIsOpen])

  const currentImage = defaultValues.image
  const paintingId = defaultValues.id as string

  const { id: artistId = "" } = useParams()

  const submitForm = handleSubmit(async ({ name, yearOfCreation, image }) => {
    const currentImg = image as File

    const data = new FormData()
    data.append("name", name)
    data.append("yearOfCreation", yearOfCreation)

    if (currentImg?.name) {
      data.append("image", currentImg)
    }

    if (paintingId) {
      await editPainting({ artistId, paintingId, data })
    } else {
      await createPainting({ artistId, data })
    }
  })

  return (
    <form className={cx("form")} onSubmit={submitForm}>
      <div className={cx("fields")}>
        <Field
          name="name"
          control={control}
          type="text"
          label="The name of the picture"
          error={errors.name?.message?.toString()}
          className={cx("field")}
        />

        <Field
          name="yearOfCreation"
          control={control}
          type="number"
          label="Year of creation"
          error={errors.yearOfCreation?.message?.toString()}
          className={cx("field", "field-year")}
        />
      </div>
      <ImageField control={control} currentImage={currentImage} />
      <Button label="Save" form="round" type="submit" disabled={!isValid} />
    </form>
  )
}
