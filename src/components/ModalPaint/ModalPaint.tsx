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

import { Modal } from "@consta/uikit/Modal"
import { Text } from "@consta/uikit/Text"
import { TextField } from "@consta/uikit/TextField"
import { useBreakpoints } from "@consta/uikit/useBreakpoints"

import ClearIcon from "@/assets/clear.svg"
import DeleteIcon from "@/assets/delete.svg"
import MountainsIcon from "@/assets/mountains.svg"
import { Button } from "@/components/Button"
import { artistApi } from "@/services/ArtistService"
import { getBase64 } from "@/utils/getBase64"
import { IconCustom } from "@/utils/icon"

import styles from "./ModalPaint.module.scss"

const schema = yup.object({
  name: yup.string().trim().required("This field is required."),
  yearOfCreation: yup.string().required("This field is required.").length(4),
  image: yup.mixed(),
})

const cx = cn.bind(styles)

export type TDefaultValues = {
  id: string
  name: string
  yearOfCreation: string
  image: string
}

interface ModalPaintProps {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
  defaultValues?: TDefaultValues
}

const initialState = {
  id: "",
  name: "",
  yearOfCreation: "",
  image: "",
}

export const ModalPaint: FC<ModalPaintProps> = ({
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

  const name = "image"
  const { field } = useController({ name, control })

  const [editPainting, { isSuccess: isEditSuccess }] =
    artistApi.useEditPaintingMutation()
  const [createPainting, { isSuccess: isCreateSuccess }] =
    artistApi.useCreatePaintingMutation()

  const isSuccess = isEditSuccess || isCreateSuccess

  const currentImage = defaultValues.image as string
  const paintingId = defaultValues.id as string

  const { id: artistId = "" } = useParams()

  const onSubmit = handleSubmit(async ({ name, yearOfCreation, image }) => {
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

  useEffect(() => {
    if (isSuccess) {
      setIsOpen(false)
    }
  }, [isSuccess, setIsOpen])

  const breakpoints = useBreakpoints({
    map: { m: 768 },
    isActive: true,
  })

  const API_BASE_URL = import.meta.env.VITE__API_BASE_URL

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

  const handleDeleteImage = useCallback(() => {
    setImage("")

    field.onChange("") // TODO:: оставить или убрать?
  }, [])

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
      <form className={cx("form")} onSubmit={onSubmit}>
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
                label="The name of the picture"
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
            name="yearOfCreation"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                {...field}
                className={cx("field", "field-year")}
                type="number"
                incrementButtons={false}
                label="Year of creation"
                labelPosition="top"
                min={4}
                required
                status={
                  errors.yearOfCreation?.message?.toString()
                    ? "warning"
                    : undefined
                }
                caption={errors.yearOfCreation?.message?.toString()}
              />
            )}
          />
        </div>
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
                view="clear"
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
          type="submit"
          disabled={!isValid}
        />
      </form>
    </Modal>
  )
}
