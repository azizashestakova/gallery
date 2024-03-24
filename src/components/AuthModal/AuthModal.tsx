import { FC, useEffect } from "react"
import { yupResolver } from "@hookform/resolvers/yup"
import cn from "classnames/bind"
import { useForm, Controller } from "react-hook-form"
import * as yup from "yup"

import { Grid } from "@consta/uikit/Grid"
import { Picture } from "@consta/uikit/Picture"
import { Text } from "@consta/uikit/Text"
import { TextField } from "@consta/uikit/TextField"
import { useBreakpoints } from "@consta/uikit/useBreakpoints"

import { useAppDispatch } from "@/app/hooks"
import { Button } from "@/components/Button"
import { ModalWindow } from "@/components/ModalWindow"
import { setAuth } from "@/features/auth/authSlice"
import { useFingerprint } from "@/hooks/useFingerprint"

import styles from "./AuthModal.module.scss"

const schema = yup.object({
  email: yup
    .string()
    .trim()
    .email("Invalid email address")
    .required("This field is required.")
    .min(4, "Email length must be at least 4 characters."),
  password: yup
    .string()
    .trim()
    .required("This field is required.")
    .min(8, "Password length must be at least 8 characters."),
})

const defaultValues = {
  email: "",
  password: "",
}

const cx = cn.bind(styles)

interface AuthModalProps {
  auth: any
  isSuccess: boolean
  image: any
  alt: string
  title: string
  description: string
  linkText: string
  modal: string
  buttonText: string
  modalActive: string
  setModalActive: (value: string) => void
}

export const AuthModal: FC<AuthModalProps> = ({
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
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
    mode: "onChange",
  })

  const dispatch = useAppDispatch()

  const fingerprint = useFingerprint()

  const breakpoints = useBreakpoints({
    map: { l: 1028, m: 768 },
    isActive: true,
  })

  useEffect(() => {
    if (isSuccess) {
      setModalActive("")
    }
  }, [isSuccess])

  const onSubmit = handleSubmit(async ({ email, password }) => {
    const tokens = await auth({
      username: email,
      password,
      fingerprint,
    }).unwrap() // TODO:: unwrap?

    dispatch(setAuth(tokens))
  })

  return (
    <ModalWindow modalActive={modalActive} setModalActive={setModalActive}>
      <Grid
        className={cx("wrapper")}
        cols={1}
        breakpoints={{
          1028: {
            cols: 2,
          },
        }}
      >
        {breakpoints.l ? (
          <Picture
            className={cx("image")}
            src={image}
            alt={alt}
            placeholder={undefined}
          />
        ) : null}
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
          <form className={cx("form")} onSubmit={onSubmit}>
            <Controller
              name="email"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  className={cx("field")}
                  type="email"
                  label="Email"
                  labelPosition="top"
                  required
                  status={
                    errors.email?.message?.toString() ? "warning" : undefined
                  }
                  caption={errors.email?.message?.toString()}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  className={cx("field", "field-last")}
                  type="password"
                  label="Password"
                  labelPosition="top"
                  required
                  status={
                    errors.password?.message?.toString() ? "warning" : undefined
                  }
                  caption={errors.password?.message?.toString()}
                />
              )}
            />
            <Button
              label={buttonText}
              className={cx("button")}
              form="round"
              type="submit"
              disabled={!isValid}
            />
          </form>
        </Grid>
      </Grid>
    </ModalWindow>
  )
}
