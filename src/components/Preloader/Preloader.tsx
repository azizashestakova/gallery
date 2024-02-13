import { FC, memo } from "react"
import cn from "classnames/bind"

import styles from "./Preloader.module.css"

const cx = cn.bind(styles)

export const Preloader: FC = memo(() => (
  <div className={cx("preloader")}>
    <svg
      className={cx("spinner")}
      viewBox="0 0 66 66"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        className={cx("ellipse-1")}
        fill="none"
        strokeWidth="5"
        strokeLinecap="round"
        stroke="currentColor"
        cx="33"
        cy="33"
        r="30"
      />
      <circle
        className={cx("ellipse-2")}
        fill="none"
        strokeWidth="5"
        strokeLinecap="round"
        stroke="currentColor"
        cx="33"
        cy="33"
        r="30"
      />
      <circle
        className={cx("ellipse-3")}
        fill="none"
        strokeWidth="5"
        strokeLinecap="round"
        stroke="currentColor"
        cx="33"
        cy="33"
        r="30"
      />
      <circle
        className={cx("ellipse-4")}
        fill="none"
        strokeWidth="5"
        strokeLinecap="round"
        stroke="currentColor"
        cx="33"
        cy="33"
        r="30"
      />
    </svg>
  </div>
))
