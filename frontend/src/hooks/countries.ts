import { useEffect } from 'react'
import create from 'zustand'
import { persist } from 'zustand/middleware'
import map from 'lodash/map'

type Coordinate = [lon: number, lat: number]

type MultiPolygon = {
  type: 'MultiPolygon'
  coordinates: Coordinate[][][]
}

type Polygon = {
  type: 'Polygon'
  coordinates: Coordinate[][]
}

interface ApiCountry {
  code: string
  name: string
  geography: MultiPolygon | Polygon
}

interface Feature {
  coordinates: Coordinate[]
}

export interface Country {
  code: string
  name: string
  features: Feature[]
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
        const response = await fetch('/api/countries.json')
        const rawCountries = (await response.json()) as ApiCountry[]

        const countries = map(rawCountries, (country) => {
          const { code, name, geography } = country

          let features: Feature[] = []

          if (geography.type === 'MultiPolygon') {
            for (const polygon of geography.coordinates) {
              for (const ring of polygon) {
                features.push({ coordinates: ring })
              }
            }
          } else {
            for (const ring of geography.coordinates) {
              features.push({ coordinates: ring })
            }
          }

          return { code, name, features }
        })

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
