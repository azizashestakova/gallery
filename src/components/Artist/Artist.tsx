import { FC } from "react"
import cn from "classnames/bind"
import { useNavigate, useParams } from "react-router-dom"
import { ReactSVG } from "react-svg"

import { Grid } from "@consta/uikit/Grid"
import { Text } from "@consta/uikit/Text"

import { ArtistInfo } from "@/components/ArtistInfo"
import { ArtWorks } from "@/components/ArtWorks"

import { artistApi } from "@/services/ArtistService"

import ArrowIcon from "@/assets/arrow.svg"

import styles from "./Artist.module.css"

const cx = cn.bind(styles)

export const Artist: FC = () => {
  const { id = "" } = useParams()
  const navigate = useNavigate()

  const { data: artist } = artistApi.useFetchArtistQuery({ id })

  return (
    <Grid className={cx("wrapper")}>
      {/* TODO:: ? заменить тег */}
      <button
        className={cx("back")}
        onClick={() => {
          navigate(-1)
        }}
      >
        <ReactSVG className={cx("icon")} src={ArrowIcon} />
        <Text
          view="primary"
          size="xs"
          lineHeight="2xs"
          transform="uppercase"
          weight="bold"
          as="span"
          className={cx("text")}
        >
          Back
        </Text>
      </button>
      {artist && (
        <ArtistInfo
          id={artist._id}
          yearsOfLife={artist.yearsOfLife}
          name={artist.name}
          description={artist.description}
          genres={artist.genres}
          imageSet={artist.avatar}
        />
      )}
      <ArtWorks paintings={artist?.paintings || []} />
    </Grid>
  )
}
