import { ChangeEvent, FC, useCallback, useRef } from "react"
import cn from "classnames/bind"
import { ControllerRenderProps } from "react-hook-form"
import { ReactSVG } from "react-svg"

import { Text } from "@consta/uikit/Text"

import DeleteIcon from "@/assets/delete.svg"
import PersonIcon from "@/assets/person.svg"
import { Button } from "@/components/Button"
import { IconCustom } from "@/utils/icon"

import styles from "./ImageField.module.scss"

const cx = cn.bind(styles)

interface ImageFieldProps {
  image: string
  setImage: (value: string) => void
  uploadImage: (file: File | undefined) => Promise<void>
  field: ControllerRenderProps<
    {
      avatar?: any
      name: string
      yearsOfLife: string
      description: string
      genres: {
        name: string
        _id: string
      }[]
    },
    "avatar"
  >
}

export const ImageField: FC<ImageFieldProps> = ({
  image,
  setImage,
  uploadImage,
  field,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleLoadImage = () => inputRef.current?.click()

  const handleChangeImage = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      await uploadImage(file)
    },
    [],
  )

  const handleDeleteImage = () => {
    setImage("")

    field.onChange("") // TODO:: оставить или убрать?
  }

  return (
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
  )
}
