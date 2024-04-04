import type { MenuItem } from "@/components/Header/types"

export const menu = (
  logOut: () => void,
  isAuthenticated: boolean,
  setModalActive: (value: string) => void,
): MenuItem[] => {
  return isAuthenticated
    ? [
        {
          label: "Log out",
          onClick: () => {
            logOut()
          },
        },
      ]
    : [
        {
          label: "Log in",
          onClick: () => {
            setModalActive("login")
          },
        },
        {
          label: "Sign up",
          onClick: () => {
            setModalActive("register")
          },
        },
      ]
}
