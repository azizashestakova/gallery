import { FC, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import DeleteIcon from "@/assets/delete.svg"
import { Button } from "@/components/Button"
import { ModalDelete } from "@/components/ModalDelete"
import { artistApi } from "@/services/ArtistService"
import { IconCustom } from "@/utils/icon"

export const ArtistDeleteButton: FC = () => {
  const [deleteArtist, { isSuccess: isSuccessDeleteArtist }] =
    artistApi.useDeleteArtistMutation()

  const { id = "" } = useParams()
  const navigate = useNavigate()

  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false)

  useEffect(() => {
    if (isSuccessDeleteArtist) {
      setIsOpenModalDelete(false)
      navigate("/") // TODO:: Добавить параметры??
    }
  }, [isSuccessDeleteArtist, navigate])

  return (
    <>
      <Button
        label="Delete"
        onlyIcon
        view="clear"
        iconLeft={IconCustom(DeleteIcon)}
        onClick={() => setIsOpenModalDelete(true)}
      />

      <ModalDelete
        isOpenModalDelete={isOpenModalDelete}
        setIsOpenModalDelete={setIsOpenModalDelete}
        variant="artist"
        onClickDelete={() => deleteArtist(id)}
      />
    </>
  )
}
