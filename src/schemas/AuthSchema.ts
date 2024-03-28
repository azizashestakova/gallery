import * as yup from "yup"

export const schema = yup.object({
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
