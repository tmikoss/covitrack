import { useEffect } from 'react'
import create from 'zustand'
import map from 'lodash/map'
import { PUBLIC_URL } from 'utils/globals'
import { polygonIncludesPoint, Coordinate } from 'utils/math'
import find from 'lodash/find'
import some from 'lodash/some'

type MultiPolygon = {
  type: 'MultiPolygon'
  coordinates: Coordinate[][][]
}

type MultiPoint = {
  type: 'MultiPoint'
  coordinates: Coordinate[]
}

interface ApiCountry {
  code: string
  name: string
  outline: MultiPolygon
  points?: MultiPoint
}

interface Feature {
  coordinates: Coordinate[]
}

export interface Country {
  code: string
  name: string
  outlines: Feature[]
  points: Feature
}

type State = {
  countries: Country[]
  activeCountry: Country | undefined
  loaded: boolean
  load: () => void
  activateByCoordinates: (point: Coordinate) => void
}

export const useCountries = create<State>((set, get) => ({
  countries: [],
  activeCountry: undefined,
  loaded: false,
  load: async () => {
    const response = await fetch(`${PUBLIC_URL}/api/countries.json`)
    const rawCountries = (await response.json()) as ApiCountry[]

    const countries = map(rawCountries, (country) => {
      const { code, name, outline, points } = country

      let outlines: Feature[] = []

      for (const polygon of outline.coordinates) {
        for (const ring of polygon) {
          outlines.push({ coordinates: ring })
        }
      }

      return { code, name, outlines, points: { coordinates: points?.coordinates || [] } }
    })

    set({ countries, loaded: true, activeCountry: undefined })
  },
  activateByCoordinates: (point: Coordinate) => {
    const { countries } = get()

    const activeCountry = find(countries, ({ outlines }) => {
      return some(outlines, ({ coordinates }) => polygonIncludesPoint(coordinates, point))
    })

    set({ activeCountry })
  },
}))

const getLoaded = (state: State) => state.loaded
const getLoad = (state: State) => state.load

export const useCountryData = () => {
  const loaded = useCountries(getLoaded)
  const load = useCountries(getLoad)

  useEffect(() => {
    if (!loaded) {
      load()
    }
  }, [load, loaded])
}
