export const convertDateToYear = (date: string) =>
  date
    .split(" – ")
    .map((el) => new Date(el).getFullYear())
    .join(" – ")
