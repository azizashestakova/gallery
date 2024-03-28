import { FC, useState } from "react"

import EditIcon from "@/assets/edit.svg"
import { Button } from "@/components/Button"
import { ModalArtist } from "@/components/ModalArtist"
import { IconCustom } from "@/utils/icon"

import type { IArtistResponse } from "@/app/models/IArtist"

interface ArtistEditButtonProps {
  artist: IArtistResponse
}

export const ArtistEditButton: FC<ArtistEditButtonProps> = ({
  artist: { name, yearsOfLife, description, genres, avatar },
}) => {
  const [isOpenModalArtist, setIsOpenModalArtist] = useState(false)

  return (
    <>
      <Button
        label="Edit"
        onlyIcon
        view="clear"
        iconLeft={IconCustom(EditIcon)}
        onClick={() => setIsOpenModalArtist(true)}
      />
      <ModalArtist
        isOpen={isOpenModalArtist}
        setIsOpen={setIsOpenModalArtist}
        defaultValues={{
          name: name,
          yearsOfLife: yearsOfLife,
          description: description,
          genres: genres,
          avatar: avatar?.webp,
        }}
      />
    </>
  )
}
