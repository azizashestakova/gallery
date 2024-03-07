import { FC } from "react"
import cn from "classnames/bind"

import { Button as ButtonConsta } from "@consta/uikit/Button"

import styles from "./Button.module.css"

const cx = cn.bind(styles)

interface ButtonProps {
  label: string
  className?: string
  view?: "primary" | "secondary" | "ghost" | "clear"
  disabled?: boolean
  form?: "default" | "brick" | "round"
  onClick: () => void
}

export const Button: FC<ButtonProps> = ({
  label,
  className,
  view = "primary",
  disabled = false,
  form = "default",
  onClick,
}) => {
  return (
    <ButtonConsta
      label={label}
      className={cx("button", className)}
      view={view}
      disabled={disabled}
      form={form}
      onClick={onClick}
      size="xs"
    />
  )
}
