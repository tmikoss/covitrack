export const lonLatToXYZ = (lon: number, lat: number, radius: number): [number, number, number] => {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lon + 90) * (Math.PI / 180)

  const x = -(radius * Math.sin(phi) * Math.cos(theta))
  const z = radius * Math.sin(phi) * Math.sin(theta)
  const y = radius * Math.cos(phi)

  return [x, y, z]
}

export const XYZToLonLat = (x: number, y: number, z: number, radius: number): [number, number] => {
  const lat = 90 - (Math.acos((y / radius) ) * 180) / Math.PI
  const lon = ((180 + (Math.atan2(x, z) * 180) / Math.PI) % 360) - 180

  return [lon, lat]
}
