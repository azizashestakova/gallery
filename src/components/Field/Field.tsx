import { FC } from "react"
import cn from "classnames/bind"
import { Controller } from "react-hook-form"

import { TextField } from "@consta/uikit/TextField"

import type { Type } from "./types"

import styles from "./Field.module.scss"

const cx = cn.bind(styles)

interface FieldProps {
  name: string
  control: any
  type: Type
  label: string
  error?: string
  className?: string
}

export const Field: FC<FieldProps> = ({
  name,
  control,
  type,
  label,
  error,
  className,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: true }}
      render={({ field }) => (
        <TextField
          {...field}
          className={cx(className, "field")}
          type={type}
          label={label}
          labelPosition="top"
          required
          status={error ? "warning" : undefined}
          caption={error}
          rows={type === "textarea" ? 6 : undefined}
        />
      )}
    />
  )
}
