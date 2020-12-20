import * as THREE from 'three'
import type { Country as CountryData } from 'hooks/countries'
import { useCases } from 'hooks/cases'
import type { State as CasesState } from 'hooks/cases'
import { useSettings } from 'hooks/settings'
import type { State as SettingsState } from 'hooks/settings'
import { useEffect, useRef } from 'react'
import { useFrame } from 'react-three-fiber'
import { useTheme } from 'styled-components'
import format from 'date-fns/format'

export const RADIUS = 100
const API_DATE_FORMAT = 'yyyyMMdd'
const WORLD_CODE = 'OWID_WRL'

const lonLatToXYZ = (lon: number, lat: number): [number, number, number] => {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lon + 180) * (Math.PI / 180)

  const x = -(RADIUS * Math.sin(phi) * Math.cos(theta))
  const z = RADIUS * Math.sin(phi) * Math.sin(theta)
  const y = RADIUS * Math.cos(phi)

  return [x, y, z]
}

export const Country: React.FC<{ country: CountryData }> = ({ country }) => {
  const { code, features } = country

  const theme = useTheme()
  const countryData = useRef(useCases.getState().countries[code] || {})
  const worldData = useRef(useCases.getState().countries[WORLD_CODE] || {})
  const date = useRef(format(useSettings.getState().focusDate, API_DATE_FORMAT))

  useEffect(
    () =>
      useCases.subscribe(
        (countries: CasesState['countries']) => {
          countryData.current = countries[code] || {}
          worldData.current = countries[WORLD_CODE] || {}
        },
        (state) => state.countries
      ),
    [code]
  )

  useEffect(
    () =>
      useSettings.subscribe(
        (focusDate: SettingsState['focusDate']) => (date.current = format(focusDate, API_DATE_FORMAT)),
        (state) => state.focusDate
      ),
    [code]
  )

  const material = new THREE.LineBasicMaterial({ color: theme.minLevel })

  let meshes = []

  for (const feature of features) {
    const { coordinates } = feature

    const vertices = []
    for (const coordinate of coordinates) {
      const xyz = lonLatToXYZ(...coordinate)
      vertices.push(...xyz)
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))

    const lineProps: any = { geometry, material } // TS thinks this is SVG line element

    meshes.push(<line key={meshes.length} {...lineProps} />)
  }

  const maxLevelColor = new THREE.Color(theme.maxLevel)

  useFrame(() => {
    const newCasesPerMillionSmoothed = countryData.current[date.current] || 0
    const worldNewCasesPerMillionSmoothed = worldData.current[date.current] || 0

    let index = 0
    if (worldNewCasesPerMillionSmoothed > 0) {
      index = newCasesPerMillionSmoothed / (worldNewCasesPerMillionSmoothed * 2)
    }

    const newColor = new THREE.Color(theme.minLevel).lerp(maxLevelColor, index)
    material.color.set(newColor)
  })

  return <group>{meshes}</group>
}
