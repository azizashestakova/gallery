import { FC, SetStateAction, useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import cn from "classnames/bind"

import { useBreakpoints } from "@consta/uikit/useBreakpoints"

import { Grid } from "@consta/uikit/Grid"
import { Text } from "@consta/uikit/Text"
import { Picture } from "@consta/uikit/Picture"
import { TextField } from "@consta/uikit/TextField"

import { Button } from "@/components/Button"
import { ModalWindow } from "@/components/ModalWindow"

import { setAuth } from "@/features/auth/authSlice"

import { useAppDispatch } from "@/app/hooks"
import { useFingerprint } from "@/hooks/useFingerprint"

import styles from "./AuthModal.module.css"

const initialState = {
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
  linkRoute: string
  buttonText: string
}

export const AuthModal: FC<AuthModalProps> = ({
  auth,
  isSuccess,
  image,
  alt,
  title,
  description,
  linkText,
  linkRoute,
  buttonText,
}) => {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useAppDispatch()

  const [formValue, setFormValue] = useState(initialState)

  const { email, password } = formValue

  const fingerprint = useFingerprint()

  const handleChange = (
    value: SetStateAction<string | null>,
    field: "email" | "password",
  ) => {
    setFormValue({ ...formValue, [field]: value })
  }

  const breakpoints = useBreakpoints({
    map: { l: 1028, m: 768 },
    isActive: true,
  })

  useEffect(() => {
    if (isSuccess) {
      navigate(-1)
    }
  }, [isSuccess, navigate])

  const onClick = async () => {
    const tokens = await auth({
      username: email,
      password,
      fingerprint,
    }).unwrap() // TODO:: unwrap?

    dispatch(setAuth(tokens))
  }

  return (
    <ModalWindow>
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
            <Text
              view="brand"
              size={breakpoints.m ? "m" : "xs"}
              lineHeight="2xs"
              weight="medium"
              as="button"
              className={cx("sign-up")}
              onClick={() => {
                navigate(`${linkRoute}`, { state: { background: location } }) // TODO:: При переключении пропадает подложка
              }}
            >
              {linkText}
            </Text>
          </Text>
          <TextField
            className={cx("field")}
            onChange={(value) => handleChange(value, "email")}
            value={email}
            type="email"
            label="Email"
            labelPosition="top"
            required
            autoFocus
          />
          <TextField
            className={cx("field", "field-last")}
            onChange={(value) => handleChange(value, "password")}
            value={password}
            type="password"
            label="Password"
            labelPosition="top"
            required
          />
          <Button
            label={buttonText}
            className={cx("button")}
            view="primary"
            form="round"
            onClick={onClick}
            disabled={email && password ? false : true}
          />
        </Grid>
      </Grid>
    </ModalWindow>
  )
}
