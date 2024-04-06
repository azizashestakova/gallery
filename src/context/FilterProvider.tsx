import { FC, ReactNode, createContext, useCallback, useMemo } from "react"
import { useSearchParams } from "react-router-dom"

import { defaultFilters } from "@/constants"
import { removeEmpty } from "@/utils/removeEmpty"

import type { Filters } from "@/types/filters"

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
  const [params, setParams] = useSearchParams({})

  const filters = useMemo(() => Object.fromEntries(params), [params])

  const changeFilters = useCallback(
    (newFilters: Filters) => setParams(removeEmpty(newFilters)),
    [setParams],
  )

  const clearFilters = useCallback(() => setParams(defaultFilters), [setParams])

  const clearSearch = useCallback(() => {
    params.delete("name")
    setParams(params)
  }, [params, setParams])

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
