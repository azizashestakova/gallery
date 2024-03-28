import { FC } from "react"

import LoginImage from "@/assets/login.jpg"
import { ModalAuth } from "@/components/ModalAuth"
import { authApi } from "@/services/AuthService"

interface LoginProps {
  modalActive: string
  setModalActive: (value: string) => void
}

export const Login: FC<LoginProps> = ({ modalActive, setModalActive }) => {
  const [login, { isSuccess }] = authApi.useLoginMutation()

  return (
    <ModalAuth
      auth={login}
      isSuccess={isSuccess}
      image={LoginImage}
      alt="Painting by Philip De Laszlo"
      title="Welcome back"
      description="If you don't have an account yet, please"
      linkText="sign up"
      modal="register"
      buttonText="Log in"
      modalActive={modalActive}
      setModalActive={setModalActive}
    />
  )
}
