import { FC, useState } from "react"
import cn from "classnames/bind"
import { useNavigate, useParams } from "react-router-dom"
import { ReactSVG } from "react-svg"

import { Grid } from "@consta/uikit/Grid"
import { Text } from "@consta/uikit/Text"

import { ArtistInfo } from "@/components/ArtistInfo"
import { ArtWorks } from "@/components/ArtWorks"
import { ActionBar } from "@/components/ActionBar"

import { artistApi } from "@/services/ArtistService"

import ArrowIcon from "@/assets/arrow.svg"
import DeleteIcon from "@/assets/delete.svg"
import EditIcon from "@/assets/edit.svg"

import styles from "./Artist.module.css"
import { ModalDelete } from "../ModalDelete"

const cx = cn.bind(styles)

export const Artist: FC = () => {
  const { id = "" } = useParams()
  const navigate = useNavigate()

  const { data: artist, isSuccess } = artistApi.useFetchArtistQuery({ id })

  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false)

  return (
    <Grid className={cx("wrapper")}>
      {/* TODO:: ? заменить тег */}
      <ActionBar>
        <>
          <button
            className={cx("back")}
            type="button"
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
          <div className={cx("buttons")}>
            <button
              className={cx("button")}
              type="button"
              // onClick={handleClearValue}
            >
              <ReactSVG src={EditIcon} />
            </button>
            <button
              className={cx("button")}
              type="button"
              onClick={() => setIsOpenModalDelete(true)}
            >
              <ReactSVG src={DeleteIcon} />
            </button>
          </div>

          <ModalDelete
            isOpen={isOpenModalDelete}
            setIsOpenModalFilter={setIsOpenModalDelete}
          />
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
      <ArtWorks paintings={artist?.paintings || []} isSuccess={isSuccess} />
    </Grid>
  )
}
