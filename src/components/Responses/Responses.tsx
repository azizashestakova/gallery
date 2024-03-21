import { FC } from "react"
import cn from "classnames/bind"
import { useNavigate } from "react-router-dom"

import { Responses404 } from "@consta/uikit/Responses404"

import { Button } from "@/components/Button"

import styles from "./Responses.module.css"

const cx = cn.bind(styles)

export const Responses: FC = () => {
  const navigate = useNavigate()

  return (
    <Responses404
      title="Page not found"
      description="This page may have already been removed, or there may be an error in your link."
      actions={
        <Button
          onClick={() => {
            navigate(-1)
          }}
          label="Back"
        />
      }
      className={cx("responses")}
    />
  )
}
