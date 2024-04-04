import {
  FC,
  useRef,
  DragEvent,
  useCallback,
  ChangeEvent,
  useState,
} from "react"
import cn from "classnames/bind"
import { Control, useController } from "react-hook-form"
import { ReactSVG } from "react-svg"

import { Text } from "@consta/uikit/Text"
import { useBreakpoints } from "@consta/uikit/useBreakpoints"

import DeleteIcon from "@/assets/delete.svg"
import MountainsIcon from "@/assets/mountains.svg"
import { Button } from "@/components/Button"
import { getBase64 } from "@/utils/getBase64"
import { IconCustom } from "@/utils/icon"

import styles from "./ImageField.module.scss"

const cx = cn.bind(styles)

interface ImageFieldProps {
  control: Control<
    {
      image?: any
      name: string
      yearOfCreation: string
    },
    any
  >
  currentImage: string
}

export const ImageField: FC<ImageFieldProps> = ({ control, currentImage }) => {
  const breakpoints = useBreakpoints({
    map: { m: 768 },
    isActive: true,
  })

  const API_BASE_URL = import.meta.env.VITE__API_BASE_URL

  const [image, setImage] = useState(
    currentImage ? `${API_BASE_URL}${currentImage}` : "",
  )

  const name = "image"
  const { field } = useController({ name, control })

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

  const changeImage = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      await uploadImage(file)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  const inputRef = useRef<HTMLInputElement | null>(null)

  const allowDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const drop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()

    const data = e.dataTransfer.files?.[0]
    uploadImage(data)
  }

  const loadImage = () => inputRef.current?.click()

  const deleteImage = () => {
    setImage("")

    field.onChange("")
  }

  return (
    <div
      onDrop={(event) => drop(event)}
      onDragOver={(event) => allowDrop(event)}
      className={cx("loading", { "loading-active": image })}
      onClick={loadImage}
    >
      {image ? (
        <>
          <img src={image} alt="avatar" className={cx("image")} />

          <Button
            label="Delete image"
            view="clear"
            onlyIcon
            iconLeft={IconCustom(DeleteIcon)}
            className={cx("button-delete")}
            onClick={deleteImage}
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
            className={cx("title")}
          >
            Drop your image here, or
          </Text>

          <Text
            view="primary"
            size="m"
            lineHeight="2xs"
            weight="medium"
            as="span"
            className={cx("link")}
          >
            {breakpoints.m ? "browse" : "browse image"}
          </Text>

          <Text
            view="primary"
            size="xs"
            lineHeight="xs"
            weight="light"
            as="span"
            className={cx("text")}
          >
            Upload only .jpg or .png format less than 3 MB
          </Text>

          <input
            className={cx("input")}
            type="file"
            accept="image/jpeg,image/png"
            ref={inputRef}
            onChange={changeImage}
          />
        </>
      )}
    </div>
  )
}
