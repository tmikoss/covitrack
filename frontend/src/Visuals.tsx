import React, { useCallback } from 'react'
import { Canvas } from 'react-three-fiber'
import { useTheme, ThemeContext } from 'styled-components'
import map from 'lodash/map'
import { Country } from 'Country'
import { OrbitControls, Stars } from '@react-three/drei'
import { PerspectiveCamera } from '@react-three/drei/PerspectiveCamera'
import { useCountries } from 'hooks/countries'
import { GLOBE_RADIUS } from 'utils/globals'
import { Effects } from 'Effects'

const InnerSphere = () => {
  const theme = useTheme()

  return (
    <mesh>
      <sphereBufferGeometry args={[GLOBE_RADIUS * 0.97, 100, 100]} />
      <meshBasicMaterial color={theme.background} side={1} transparent={true} opacity={0.95} />
    </mesh>
  )
}

export const Visuals = () => {
  const theme = useTheme()

  const data = useCountries(useCallback((state) => state.countries, []))

  const countries = map(data, (country) => <Country country={country} key={country.code} />)

  return (
    <Canvas onCreated={({ gl }) => gl.setClearColor(theme.background)} colorManagement={false}>
      <ThemeContext.Provider value={theme}>
        <Stars fade factor={10} radius={GLOBE_RADIUS * 3.2} />
        <ambientLight />

        {countries}

        <InnerSphere />

        <PerspectiveCamera
          makeDefault
          near={0.001}
          far={GLOBE_RADIUS * 10}
          fov={90}
          position={[GLOBE_RADIUS * 1.2, GLOBE_RADIUS * 1.2, 0]}
        />

        <OrbitControls enablePan={false} minDistance={GLOBE_RADIUS * 1.1} maxDistance={GLOBE_RADIUS * 3} />

        <Effects />
      </ThemeContext.Provider>
    </Canvas>
  )
}
