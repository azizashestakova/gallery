import { FC } from "react"
import cn from "classnames/bind"

import { Image } from "@/components/Image"
import { Stub } from "@/components/Stub"

import type { ImageSet } from "@/app/models/IArtist"

import styles from "./Avatar.module.scss"

const cx = cn.bind(styles)

interface AvatarProps {
  avatar: ImageSet
  name: string
}

export const Avatar: FC<AvatarProps> = ({ avatar, name }) => {
  return (
    <div className={cx("wrapper-image")}>
      {avatar ? <Image alt={name} imageSet={avatar} /> : <Stub />}
    </div>
  )
}
