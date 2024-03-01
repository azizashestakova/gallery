import { RefObject, useEffect, useRef, useState } from "react"

export const useOutsideClick = <T extends HTMLElement>(
  initialIsVisible: boolean,
) => {
  const [isComponentVisible, setIsComponentVisible] = useState(initialIsVisible)
  const ref = useRef(null) as RefObject<T>

  const handleHideDropdown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setIsComponentVisible(false)
    }
  }

  const handleClickOutside = (event: MouseEvent | TouchEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setIsComponentVisible(false)
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleHideDropdown, true)
    document.addEventListener("click", handleClickOutside, true)
    return () => {
      document.removeEventListener("keydown", handleHideDropdown, true)
      document.removeEventListener("click", handleClickOutside, true)
    }
  })

  return { ref, isComponentVisible, setIsComponentVisible }
}
