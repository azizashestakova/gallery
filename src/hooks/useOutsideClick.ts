import { RefObject, useEffect, useRef, useState } from "react"

export const useOutsideClick = <T extends HTMLDivElement>(
  initialIsVisible: boolean,
) => {
  const [isComponentVisible, setIsComponentVisible] = useState(initialIsVisible)
  const ref = useRef(null) as RefObject<T>

  const hideDropdown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setIsComponentVisible(false)
    }
  }

  const clickOutside = (event: MouseEvent | TouchEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setIsComponentVisible(false)
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", hideDropdown, true)
    document.addEventListener("click", clickOutside, true)

    return () => {
      document.removeEventListener("keydown", hideDropdown, true)
      document.removeEventListener("click", clickOutside, true)
    }
  })

  return { ref, isComponentVisible, setIsComponentVisible }
}
