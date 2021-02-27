export type Coordinate = [lon: number, lat: number]

export const lonLatToXYZ = (lon: number, lat: number, radius: number): [number, number, number] => {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lon + 90) * (Math.PI / 180)

  const x = -(radius * Math.sin(phi) * Math.cos(theta))
  const z = radius * Math.sin(phi) * Math.sin(theta)
  const y = radius * Math.cos(phi)

  return [x, y, z]
}

export const XYZToLonLat = (x: number, y: number, z: number, radius: number): Coordinate => {
  const lat = 90 - (Math.acos(y / radius) * 180) / Math.PI
  const lon = ((180 + (Math.atan2(x, z) * 180) / Math.PI) % 360) - 180

  return [lon, lat]
}

export const polygonIncludesPoint = (polygon: Coordinate[], point: Coordinate) => {
  // ray-casting algorithm based on
  // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html

  const [x, y] = point

  let inside = false
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i][0]
    const yi = polygon[i][1]
    const xj = polygon[j][0]
    const yj = polygon[j][1]

    const intersect = yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi

    if (intersect) {
      inside = !inside
    }
  }

  return inside
}
