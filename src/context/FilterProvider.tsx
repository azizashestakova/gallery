import {
  FC,
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useMemo,
} from "react"
import { useSearchParams } from "react-router-dom"

import { useAppSelector } from "@/app/hooks"

import { selectIsAuthenticated } from "@/features/auth/authSlice"

import { removeEmpty } from "@/utils/removeEmpty"

import type { IArtistParams } from "@/app/models/IArtist"

import { defaultFilters } from "@/constants"

export type Filters = { genres?: string } & Omit<IArtistParams, "genres"> &
  Record<string, string | string[]> // TODO:: проверить

interface IFilterContext {
  filters: Filters
  changeFilters: (newFilters: Filters) => void
  clearFilters: () => void
  clearSearch: () => void
}

export const FilterContext = createContext({} as IFilterContext)

interface IFilterProvider {
  children: ReactNode
}

export const FilterProvider: FC<IFilterProvider> = ({ children }) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated)

  const [params, setParams] = useSearchParams({})

  const filters = useMemo(() => Object.fromEntries(params), [params])

  useEffect(() => {
    // TODO:: проверить при логине
    if (
      isAuthenticated &&
      !params.toString() &&
      window.location.pathname === "/"
    ) {
      setParams(defaultFilters)
    }
  })

  const changeFilters = useCallback(
    (newFilters: Filters) => setParams(removeEmpty(newFilters)), // TODO:: проверить removeEmpty
    [setParams],
  )

  const clearFilters = useCallback(() => setParams(defaultFilters), [setParams])

  const clearSearch = useCallback(() => {
    params.delete("name")
    setParams(params)
  }, [setParams])

  const contextValue = useMemo(
    () => ({
      filters,
      changeFilters,
      clearFilters,
      clearSearch,
    }),
    [changeFilters, clearFilters, clearSearch, filters],
  )

  return (
    <FilterContext.Provider value={contextValue}>
      {children}
    </FilterContext.Provider>
  )
}
