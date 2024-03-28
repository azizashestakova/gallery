import { FC } from "react"
import cn from "classnames/bind"
import { useNavigate, useParams } from "react-router-dom"

import { Grid } from "@consta/uikit/Grid"

import { useAppSelector } from "@/app/hooks"
import ArrowIcon from "@/assets/arrow.svg"
import { ActionBar } from "@/components/ActionBar"
import { ArtistDeleteButton } from "@/components/ArtistDeleteButton"
import { ArtistEditButton } from "@/components/ArtistEditButton"
import { ArtistInfo } from "@/components/ArtistInfo"
import { ArtWorks } from "@/components/ArtWorks"
import { Button } from "@/components/Button"
import { Preloader } from "@/components/Preloader"
import { selectIsAuthenticated } from "@/features/auth/authSlice"
import { artistApi } from "@/services/ArtistService"
import { IconCustom } from "@/utils/icon"

import styles from "./Artist.module.scss"

const cx = cn.bind(styles)

export const Artist: FC = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated)

  const { id = "" } = useParams()
  const navigate = useNavigate()

  const { data: artist, isSuccess } = artistApi.useFetchArtistQuery({ id })

  if (!isSuccess) {
    return <Preloader className={cx("preloader")} />
  }

  return (
    <Grid className={cx("wrapper")}>
      <ActionBar>
        <Button
          label="Back"
          className={cx("back")}
          view="ghost"
          iconLeft={IconCustom(ArrowIcon)}
          onClick={() => {
            navigate(-1)
          }}
        />
        {isAuthenticated && (
          <div className={cx("buttons")}>
            <ArtistEditButton artist={artist} />
            <ArtistDeleteButton />
          </div>
        )}
      </ActionBar>
      {artist && <ArtistInfo artist={artist} />}
      <ArtWorks paintings={artist?.paintings || []} />
    </Grid>
  )
}
