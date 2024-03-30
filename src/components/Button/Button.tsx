import { forwardRef } from "react"
import cn from "classnames/bind"

import { IconComponent } from "@consta/icons/Icon"
import { Button as ButtonConsta } from "@consta/uikit/Button"

import styles from "./Button.module.scss"

const cx = cn.bind(styles)

interface ButtonProps {
  label: string
  className?: string
  view?: "primary" | "secondary" | "ghost" | "clear"
  disabled?: boolean
  form?: "default" | "brick" | "round"
  iconLeft?: IconComponent
  onClick?: () => void
  onlyIcon?: boolean
  type?: "button" | "reset" | "submit"
  size?: "xs" | "s" | "m" | "l"
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
