import { FC } from "react"
import cn from "classnames/bind"
import { ReactSVG } from "react-svg"

import { Text } from "@consta/uikit/Text"

import PersonIcon from "@/assets/person.svg"

import styles from "./HoverArea.module.scss"

const cx = cn.bind(styles)

interface HoverAreaProps {
  setIsDraggable: (value: boolean) => void
}

export const HoverArea: FC<HoverAreaProps> = ({ setIsDraggable }) => {
  return (
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
  )
}
