import { useEffect } from 'react'
import create from 'zustand'
import { persist } from 'zustand/middleware'

type Lon = number
type Lat = number

type Coordinate = [Lon, Lat]

type MultiPolygon = {
  type: 'MultiPolygon'
  coordinates: Coordinate[][][]
}

export interface Country {
  code: string
  name: string
  geography: MultiPolygon
}

type State = {
  countries: Country[]
  loaded: boolean
  load: () => void
}

export const useCountries = create<State>(
  persist(
    (set) => ({
      countries: [],
      loaded: false,
      load: async () => {
        const response = await fetch('/api/countries')
        const countries = await response.json()
        set({ countries, loaded: true })
      },
    }),
    { name: 'countries-base-data' }
  )
)

const getLoaded = (state: State) => state.loaded
const getLoad = (state: State) => state.load

export const useCountryData = () => {
  const loaded = useCountries(getLoaded)
  const load = useCountries(getLoad)

  useEffect(() => {
    if (!loaded) {
      load()
    }
  }, [loaded])
}
