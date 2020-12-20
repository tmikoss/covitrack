import * as THREE from 'three'
import type { Country as CountryData } from 'hooks/countries'

const extrudeOptions = {
  curveSegments: 1,
  steps: 1,
  depth: 0.2,
  bevelEnabled: false,
}

export const Country: React.FC<{ country: CountryData }> = ({ country }) => {
  const {
    geography: { coordinates },
  } = country

  let meshes = []

  for (const polygon of coordinates) {
    for (const ring of polygon) {
      let initialized = false

      const shape = new THREE.Shape()

      for (const coordinate of ring) {
        const [lon, lat] = coordinate
        if (initialized) {
          shape.lineTo(lon, lat)
        } else {
          initialized = true
          shape.moveTo(lon, lat)
        }
      }

      meshes.push(
        <mesh key={meshes.length}>
          <extrudeBufferGeometry args={[shape, extrudeOptions]} />
          <meshStandardMaterial color={'orange'} />
        </mesh>
      )
    }
  }

  return <group>{meshes}</group>
}
