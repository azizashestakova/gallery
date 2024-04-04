export const convertDateToYear = (text: string) => {
  const dates = text.split(" – ").map((el) => new Date(el).getFullYear())

  if (isNaN(dates[0])) {
    return "No date specified"
  }

  return dates.join(" – ")
}
