import { FC, useState } from "react"

import PlusIcon from "@/assets/plus.svg"
import { Button } from "@/components/Button"
import { ModalArtist } from "@/components/ModalArtist"
import { IconCustom } from "@/utils/icon"

export const ArtistAddButton: FC = () => {
  const [isOpenModalArtist, setIsOpenModalArtist] = useState(false)

  return (
    <>
      <Button
        label="Add artist"
        view="ghost"
        iconLeft={IconCustom(PlusIcon)}
        onClick={() => {
          setIsOpenModalArtist(true)
        }}
      />

      <ModalArtist
        isOpenModalArtist={isOpenModalArtist}
        setIsOpenModalArtist={setIsOpenModalArtist}
      />
    </>
  )
}
