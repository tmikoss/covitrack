import React, { useCallback } from 'react'
import { Canvas } from 'react-three-fiber'
import { useTheme, ThemeContext } from 'styled-components'
import map from 'lodash/map'
import { Country } from 'Country'
import { PerspectiveCamera } from '@react-three/drei/PerspectiveCamera'
import { CameraControls } from 'CameraControls'
import { useCountries } from 'hooks/countries'

export const Visuals = () => {
  const theme = useTheme()

  const data = useCountries(useCallback((state) => state.countries, []))

  const countries = map(data, (country) => <Country country={country} key={country.code} />)

  return (
    <Canvas onCreated={({ gl }) => gl.setClearColor(theme.background)} colorManagement={false}>
      <ThemeContext.Provider value={theme}>
        {/* <Stars fade factor={3} /> */}
        <ambientLight />

        {countries}

        <PerspectiveCamera makeDefault near={0.001} far={360} fov={90} position={[0, 0, 100]} />

        <CameraControls />
      </ThemeContext.Provider>
    </Canvas>
  )
}
