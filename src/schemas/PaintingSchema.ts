import * as yup from "yup"

export const schema = yup.object({
  name: yup.string().trim().required("This field is required."),
  yearOfCreation: yup.string().required("This field is required.").length(4),
  image: yup.mixed(),
})
