import { forwardRef } from "react"
import cn from "classnames/bind"

import { IconComponent } from "@consta/icons/Icon"
import { Button as ButtonConsta } from "@consta/uikit/Button"

import type { Form, Size, Type, View } from "./types"

import styles from "./Button.module.scss"

const cx = cn.bind(styles)

interface ButtonProps {
  label: string
  className?: string
  view?: View
  disabled?: boolean
  form?: Form
  iconLeft?: IconComponent
  onClick?: () => void
  onlyIcon?: boolean
  type?: Type
  size?: Size
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      label,
      className,
      view = "primary",
      disabled = false,
      form = "default",
      iconLeft,
      onClick,
      onlyIcon = false,
      type = "button",
      size = "xs",
    },
    ref,
  ) => {
    return (
      <ButtonConsta
        ref={ref}
        label={label}
        className={cx("button", className)}
        view={view}
        disabled={disabled}
        form={form}
        iconLeft={iconLeft}
        onClick={onClick}
        size={size}
        onlyIcon={onlyIcon}
        type={type}
      />
    )
  },
)
