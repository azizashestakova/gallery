import { FC } from "react"

import LoginImage from "@/assets/login.jpg"
import { AuthModal } from "@/components/AuthModal"
import { authApi } from "@/services/AuthService"

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
