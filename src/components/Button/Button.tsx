import { FC } from "react"
import cn from "classnames/bind"

import { IconComponent } from "@consta/icons/Icon"

import { Button as ButtonConsta } from "@consta/uikit/Button"

import styles from "./Button.module.css"

const cx = cn.bind(styles)

interface ButtonProps {
  label: string
  className?: string
  view?: "primary" | "secondary" | "ghost" | "clear"
  disabled?: boolean
  form?: "default" | "brick" | "round"
  iconLeft?: IconComponent
  onClick: () => void
  onlyIcon?: boolean
}

export const Button: FC<ButtonProps> = ({
  label,
  className,
  view = "primary",
  disabled = false,
  form = "default",
  iconLeft,
  onClick,
  onlyIcon = false,
}) => {
  return (
    <ButtonConsta
      label={label}
      className={cx("button", className)}
      view={view}
      disabled={disabled}
      form={form}
      iconLeft={iconLeft}
      onClick={onClick}
      size="xs"
      onlyIcon={onlyIcon}
    />
  )
}
