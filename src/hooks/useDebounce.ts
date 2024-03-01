import { Dispatch, useEffect, useState } from "react"

export const useDebounce = <T>(
  initialValue: T,
  time: number,
): [T, T, Dispatch<T>] => {
  const [value, setValue] = useState(initialValue)
  const [debouncValue, setDebounceValue] = useState(initialValue)

  useEffect(() => {
    const debounce = setTimeout(() => setDebounceValue(value), time)

    return () => clearTimeout(debounce)
  }, [time, value])

  return [debouncValue, value, setValue]
}
