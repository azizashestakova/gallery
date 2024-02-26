import { FC } from "react"

import { AuthModal } from "@/components/AuthModal"

import { authApi } from "@/services/AuthService"

import LoginImage from "@/assets/login.jpg"

export const Login: FC = () => {
  const [login, { isSuccess }] = authApi.useLoginMutation()

  return (
    <AuthModal
      auth={login}
      isSuccess={isSuccess}
      image={LoginImage}
      alt="Painting by Philip De Laszlo"
      title="Welcome back"
      description="If you don't have an account yet, please"
      linkText="sign up"
      linkRoute="/register"
      buttonText="Log in"
    />
  )
}
