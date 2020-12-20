import * as THREE from 'three'
import type { Country as CountryData } from 'hooks/countries'

export const RADIUS = 100

const lonLatToXYZ = (lon: number, lat: number): [number, number, number] => {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lon + 180) * (Math.PI / 180)

  const x = -(RADIUS * Math.sin(phi) * Math.cos(theta))
  const z = RADIUS * Math.sin(phi) * Math.sin(theta)
  const y = RADIUS * Math.cos(phi)

  return [x, y, z]
}

export const Country: React.FC<{ country: CountryData }> = ({ country }) => {
  const { features } = country

  let meshes = [] as any

  for (const feature of features) {
    const vertices = []
    for (const coordinate of feature.coordinates) {
      const xyz = lonLatToXYZ(...coordinate)
      vertices.push(...xyz)
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))

    meshes.push(
      <points key={meshes.length} geometry={geometry}>
        <pointsMaterial color={'orange'} size={0.15} />
      </points>
    )
  }

  return <group>{meshes}</group>
}
