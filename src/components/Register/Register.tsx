import { FC } from "react"

import { AuthModal } from "@/components/AuthModal"

import { authApi } from "@/services/AuthService"

import RegisterImage from "@/assets/register.jpg"

export const Register: FC = () => {
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
      linkRoute="/login"
      buttonText="Sign up"
    />
  )
}
