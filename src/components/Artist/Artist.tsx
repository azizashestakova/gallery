import { FC, useState, useEffect } from "react"
import cn from "classnames/bind"
import { useNavigate, useParams } from "react-router-dom"

import { Grid } from "@consta/uikit/Grid"

import { useAppSelector } from "@/app/hooks"
import ArrowIcon from "@/assets/arrow.svg"
import DeleteIcon from "@/assets/delete.svg"
import EditIcon from "@/assets/edit.svg"
import { ActionBar } from "@/components/ActionBar"
import { ArtistInfo } from "@/components/ArtistInfo"
import { ArtWorks } from "@/components/ArtWorks"
import { Button } from "@/components/Button"
import { ModalArtist } from "@/components/ModalArtist"
import { ModalDelete } from "@/components/ModalDelete"
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

  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false)
  const [isOpenModalArtist, setIsOpenModalArtist] = useState(false)

  const [deleteArtist, { isSuccess: isSuccessDeleteArtist }] =
    artistApi.useDeleteArtistMutation()

  useEffect(() => {
    if (isSuccessDeleteArtist) {
      setIsOpenModalDelete(false)
      navigate("/") // TODO:: Добавить параметры??
    }
  }, [isSuccessDeleteArtist, navigate, setIsOpenModalDelete])

  const onClickDelete = () => {
    deleteArtist(id)
  }

  return !isSuccess ? (
    <div className={cx("preloader")}>
      <Preloader />
    </div>
  ) : (
    <Grid className={cx("wrapper")}>
      <ActionBar>
        <>
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
              <Button
                label="Edit"
                onlyIcon
                view="clear"
                iconLeft={IconCustom(EditIcon)}
                onClick={() => setIsOpenModalArtist(true)}
              />
              <Button
                label="Delete"
                onlyIcon
                view="clear"
                iconLeft={IconCustom(DeleteIcon)}
                onClick={() => setIsOpenModalDelete(true)}
              />
            </div>
          )}
          <ModalDelete
            isOpen={isOpenModalDelete}
            setIsOpen={setIsOpenModalDelete}
            variant="artist"
            onClickDelete={onClickDelete}
          />
          {artist && (
            <ModalArtist
              isOpen={isOpenModalArtist}
              setIsOpen={setIsOpenModalArtist}
              defaultValues={{
                name: artist.name,
                yearsOfLife: artist.yearsOfLife,
                description: artist.description,
                genres: artist.genres,
                avatar: artist.avatar?.webp,
              }}
            />
          )}
        </>
      </ActionBar>
      {artist && (
        <ArtistInfo
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
