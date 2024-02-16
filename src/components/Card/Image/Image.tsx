import { FC, memo, useRef, useState } from "react"
import cn from "classnames/bind"

import { Preloader } from "@/components/Preloader"

import { useOnScreen } from "@/hooks/useOnScreen"

import styles from "./Image.module.css"

const cx = cn.bind(styles)

interface ImageProps {
  src: string
  alt: string
  webp?: string
  src2x?: string
  webp2x?: string
  className?: string
}

export const Image: FC<ImageProps> = memo(
  ({ webp, src, src2x, webp2x, alt, className }) => {
    const [isLoaded, setIsLoaded] = useState(false)

    const ref = useRef<HTMLDivElement | null>(null)

    const isVisible = useOnScreen(ref)

    const API_BASE_URL = import.meta.env.VITE__API_BASE_URL

    return (
      <div className={cx("wrapper")} ref={ref}>
        <picture>
          {webp2x && (
            <source
              media="(min-width: 768px)"
              srcSet={`${API_BASE_URL}${webp2x}`}
              type="image/webp"
            />
          )}
          {src2x && (
            <source
              media="(min-width: 768px)"
              srcSet={`${API_BASE_URL}${src2x}`}
              type="image/jpeg"
            />
          )}
          {webp && (
            <source srcSet={`${API_BASE_URL}${webp}`} type="image/webp" />
          )}
          <img
            className={cx(
              "image",
              {
                "image-loaded": isLoaded && isVisible,
              },
              className,
            )}
            src={`${API_BASE_URL}${src}`}
            alt={alt}
            loading="lazy"
            onLoad={() => setIsLoaded(true)}
          />
        </picture>

        {(!isLoaded || !isVisible) && (
          <div className={cx("preloader")}>
            <Preloader />
          </div>
        )}
      </div>
    )
  },
)
