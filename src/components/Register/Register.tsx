import { FC } from "react"

import RegisterImage from "@/assets/register.jpg"
import { AuthModal } from "@/components/AuthModal"
import { authApi } from "@/services/AuthService"

interface RegisterProps {
  modalActive: string
  setModalActive: (value: string) => void
}

export const Register: FC<RegisterProps> = ({
  modalActive,
  setModalActive,
}) => {
  const [register, { isSuccess }] = authApi.useRegisterMutation()

  return (
    <AuthModal
      auth={register}
      isSuccess={isSuccess}
      image={RegisterImage}
      alt="Scenery"
      title="Create your profile"
      description="If you already have an account, please"
      linkText="log in"
      modal="login"
      buttonText="Sign up"
      modalActive={modalActive}
      setModalActive={setModalActive}
    />
  )
}
