import { useEffect } from 'react'
import create from 'zustand'

type DataByDate = Record<string, number>

interface ApiCountry {
  country: string
  newCases: DataByDate
}

export type State = {
  countries: Record<string, DataByDate>
  loaded: boolean
  load: () => void
}

export const useCases = create<State>((set) => ({
  countries: {},
  loaded: false,
  load: async () => {
    const response = await fetch('/api/cases.json')
    const apiData = (await response.json()) as ApiCountry[]
    const countries: State['countries'] = {}

    for (const item of apiData) {
      const { country, newCases } = item
      countries[country] = newCases
    }

    set({ countries, loaded: true })
  },
}))

const getLoaded = (state: State) => state.loaded
const getLoad = (state: State) => state.load

export const useCaseData = () => {
  const loaded = useCases(getLoaded)
  const load = useCases(getLoad)

  useEffect(() => {
    if (!loaded) {
      load()
    }
  }, [loaded])
}
