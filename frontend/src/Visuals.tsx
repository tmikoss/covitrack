import React, { useCallback } from 'react'
import { Canvas } from 'react-three-fiber'
import { useTheme, ThemeContext } from 'styled-components'
import map from 'lodash/map'
import { Country, RADIUS } from 'Country'
import { Stars } from '@react-three/drei'
import { PerspectiveCamera } from '@react-three/drei/PerspectiveCamera'
import { CameraControls } from 'CameraControls'
import { useCountries } from 'hooks/countries'

const InnerSphere = () => {
  const theme = useTheme()

  return <mesh>
    <sphereBufferGeometry args={[RADIUS * 0.99, 100, 100]} />
    <meshBasicMaterial color={theme.background} side={2} transparent={true} opacity={0.85}/>
  </mesh>
}

export const Visuals = () => {
  const theme = useTheme()

  const data = useCountries(useCallback((state) => state.countries, []))

  const countries = map(data, (country) => <Country country={country} key={country.code} />)

  return (
    <Canvas onCreated={({ gl }) => gl.setClearColor(theme.background)} colorManagement={false}>
      <ThemeContext.Provider value={theme}>
        <Stars fade factor={3} />
        <ambientLight />

        {countries}

        <InnerSphere />

        <PerspectiveCamera makeDefault near={0.001} far={360} fov={90} position={[0, 0, -150]} />

        <CameraControls />
      </ThemeContext.Provider>
    </Canvas>
  )
}