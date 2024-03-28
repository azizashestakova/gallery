import * as yup from "yup"

export const schema = yup.object({
  name: yup.string().trim().required("This field is required."),
  yearsOfLife: yup.string().trim().required("This field is required."),
  description: yup.string().trim().required("This field is required."),
  genres: yup
    .array()
    .min(1)
    .of(
      yup.object().shape({
        _id: yup.string().required(),
        name: yup.string().required(),
      }),
    )
    .required("This field is required."),
  avatar: yup.mixed(),
})
