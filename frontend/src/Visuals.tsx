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
import { XYZToLonLat } from 'utils/math'
import * as THREE from 'three'

const InnerSphere = () => {
  const theme = useTheme()

  const radius = GLOBE_RADIUS * 0.99

  return (
    <mesh>
      <sphereBufferGeometry args={[radius, 100, 100]} />
      <meshBasicMaterial color={theme.background} side={THREE.FrontSide} transparent={true} opacity={0.95} />
    </mesh>
  )
}

const ClickDetectorSphere = () => {
  const radius = GLOBE_RADIUS

  const activateByCoordinates = useCountries(useCallback((state) => state.activateByCoordinates, []))

  const onDoubleClick = (a: any) => {
    const { x, y, z } = a.point

    const point = XYZToLonLat(x, y, z, radius)

    activateByCoordinates(point)
  }

  return (
    <mesh onDoubleClick={onDoubleClick}>
      <sphereBufferGeometry args={[radius, 100, 100]} />
      <meshBasicMaterial side={THREE.FrontSide} transparent={true} opacity={0} />
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

        <InnerSphere />

        {countries}

        <ClickDetectorSphere />

        <PerspectiveCamera
          makeDefault
          near={0.001}
          far={GLOBE_RADIUS * 10}
          fov={90}
          position={[GLOBE_RADIUS * 0.2, GLOBE_RADIUS * 1.5, GLOBE_RADIUS]}
        />

        <OrbitControls enablePan={false} minDistance={GLOBE_RADIUS * 1.1} maxDistance={GLOBE_RADIUS * 2} />

        <Effects />
      </ThemeContext.Provider>
    </Canvas>
  )
}
