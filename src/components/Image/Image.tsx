import { FC, memo, useState } from "react"
import cn from "classnames/bind"

import { Preloader } from "@/components/Preloader"

import type { ImageSet } from "@/app/models/IArtist"

import styles from "./Image.module.scss"

const cx = cn.bind(styles)

interface ImageProps {
  imageSet: ImageSet
  alt: string
  className?: string
}

export const Image: FC<ImageProps> = memo(
  ({ imageSet: { webp, src, src2x, webp2x }, alt, className }) => {
    const [isLoaded, setIsLoaded] = useState(false)

    const API_BASE_URL = import.meta.env.VITE__API_BASE_URL

    return (
      <div className={cx("wrapper")}>
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
                "image-loaded": isLoaded,
              },
              className,
            )}
            src={`${API_BASE_URL}${src}`}
            alt={alt}
            loading="lazy"
            onLoad={() => setIsLoaded(true)}
          />
        </picture>

        {!isLoaded && <Preloader className={cx("preloader")} />}
      </div>
    )
  },
)
