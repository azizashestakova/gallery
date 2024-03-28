import { FC, useEffect } from "react"
import { MutationTrigger } from "@reduxjs/toolkit/dist/query/react/buildHooks"
import {
  MutationDefinition,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from "@reduxjs/toolkit/query"
import cn from "classnames/bind"

import { Grid } from "@consta/uikit/Grid"
import { Modal } from "@consta/uikit/Modal"
import { Picture } from "@consta/uikit/Picture"
import { Text } from "@consta/uikit/Text"
import { useBreakpoints } from "@consta/uikit/useBreakpoints"

import { AuthDto, AuthResponse } from "@/app/models/IAuth"
import ClearIcon from "@/assets/clear.svg"
import { AuthForm } from "@/components/AuthForm"
import { Button } from "@/components/Button"
import { IconCustom } from "@/utils/icon"

import styles from "./ModalAuth.module.scss"

const cx = cn.bind(styles)

interface ModalAuthProps {
  // TODO:: оставить или нет?
  auth: MutationTrigger<
    MutationDefinition<
      AuthDto,
      BaseQueryFn<
        string | FetchArgs,
        unknown,
        FetchBaseQueryError,
        object,
        FetchBaseQueryMeta
      >,
      "Artists" | "Artist",
      AuthResponse,
      "api"
    >
  >
  isSuccess: boolean
  image: string
  alt: string
  title: string
  description: string
  linkText: string
  modal: string
  buttonText: string
  modalActive: string
  setModalActive: (value: string) => void
}

export const ModalAuth: FC<ModalAuthProps> = ({
  auth,
  isSuccess,
  image,
  alt,
  title,
  description,
  linkText,
  modal,
  buttonText,
  modalActive,
  setModalActive,
}) => {
  const breakpoints = useBreakpoints({
    map: { l: 1028, m: 768 },
    isActive: true,
  })

  useEffect(() => {
    if (isSuccess) {
      setModalActive("")
    }
  }, [isSuccess, setModalActive])

  return (
    <Modal
      isOpen={!!modalActive}
      onClickOutside={() => {
        setModalActive("")
      }}
      onEsc={() => {
        setModalActive("")
      }}
      className={cx("modal")}
    >
      <Button
        label="Close"
        view="ghost"
        onlyIcon
        iconLeft={IconCustom(ClearIcon)}
        className={cx("button")}
        onClick={() => {
          setModalActive("")
        }}
      />
      <Grid
        className={cx("wrapper")}
        cols={1}
        breakpoints={{
          1028: {
            cols: 2,
          },
        }}
      >
        {breakpoints.l && (
          <Picture
            className={cx("image")}
            src={image}
            alt={alt}
            placeholder={undefined}
          />
        )}

        <Grid className={cx("content")}>
          <Text
            view="brand"
            size={breakpoints.l ? "4xl" : breakpoints.m ? "5xl" : "3xl"}
            lineHeight="2xs"
            weight="medium"
            as="h2"
            className={cx("title")}
          >
            {title}
          </Text>

          <Text
            view="brand"
            size={breakpoints.m ? "m" : "xs"}
            lineHeight="2xs"
            weight="light"
            as="p"
            className={cx("text")}
          >
            {description}{" "}
            <Button
              label={linkText}
              className={cx("sign-up")}
              view="ghost"
              onClick={() => {
                setModalActive(modal)
              }}
            />
          </Text>

          <AuthForm auth={auth} buttonText={buttonText} />
        </Grid>
      </Grid>
    </Modal>
  )
}
