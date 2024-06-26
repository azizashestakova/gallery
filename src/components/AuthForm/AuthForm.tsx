import { FC } from "react"
import { yupResolver } from "@hookform/resolvers/yup"
import { MutationTrigger } from "@reduxjs/toolkit/dist/query/react/buildHooks"
import {
  MutationDefinition,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query"
import cn from "classnames/bind"
import { useForm } from "react-hook-form"

import { useAppDispatch } from "@/app/hooks"
import { AuthDto, AuthResponse } from "@/app/models/IAuth"
import { Button } from "@/components/Button"
import { Field } from "@/components/Field"
import { setCredentials } from "@/features/auth/authSlice"
import { useFingerprint } from "@/hooks/useFingerprint"
import { schema } from "@/schemas/AuthSchema"

import styles from "./AuthForm.module.scss"

const defaultValues = {
  email: "",
  password: "",
}

const cx = cn.bind(styles)

interface AuthFormProps {
  // TODO:: отредактировать
  auth: MutationTrigger<
    MutationDefinition<
      AuthDto,
      BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>,
      "Artists" | "Artist",
      AuthResponse,
      "api"
    >
  >
  buttonText: string
}

export const AuthForm: FC<AuthFormProps> = ({ auth, buttonText }) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
    mode: "onBlur",
  })

  const dispatch = useAppDispatch()

  const fingerprint = useFingerprint()

  const submitForm = handleSubmit(async ({ email, password }) => {
    const tokens = await auth({
      username: email,
      password,
      fingerprint,
    }).unwrap()

    dispatch(setCredentials(tokens))
  })

  return (
    <form className={cx("form")} onSubmit={submitForm}>
      <Field
        name="email"
        control={control}
        type="email"
        label="Email"
        error={errors.email?.message?.toString()}
        className={cx("field")}
      />

      <Field
        name="password"
        control={control}
        type="password"
        label="Password"
        error={errors.password?.message?.toString()}
        className={cx("field", "field-last")}
      />

      <Button
        label={buttonText}
        className={cx("button")}
        form="round"
        type="submit"
        disabled={!isValid}
      />
    </form>
  )
}
