import { writeFileSync } from 'fs'
import { join } from 'path'
import { database } from './db'

const STATIC_FILE = join(__dirname, '../public/api/countries.json')

const buildBufferedOutlines = async () => {
  await database.query(`
    UPDATE areas
    SET "bufferedOutline" = ST_Multi(
      ST_Segmentize(
        ST_Buffer(
          ST_Simplify(
            outline,
            0.01,
            true
          ),
          -0.05,
          'side=left'
        ),
        1
      )
    )
    WHERE outline IS NOT NULL
  `)
}

const buildContainedPoints = async () => {
  await database.query(`
    WITH points AS (
      SELECT ST_SetSRID(ST_Point(lon, lat), 4326) as point
      FROM generate_series(-180, 180) as x(lon)
      JOIN generate_series(-90, 90) as y(lat) ON true
    )
    UPDATE areas
    SET "containedPoints" = (
      SELECT ST_Multi(ST_Collect(ARRAY_AGG(points.point)))
      FROM points
      WHERE ST_Contains("bufferedOutline", points.point)
    )
    WHERE "bufferedOutline" IS NOT NULL
  `)
}

const buildMissingContainedPointsFromCenters = async () => {
  await database.query(`
    UPDATE areas
    SET "containedPoints" = ST_Multi(ST_Centroid(outline))
    WHERE "containedPoints" IS NULL
  `)
}

const exportToStaticFile = async () => {
  const [data] = await database.query(`
    SELECT code,
        	 name,
        	 ST_AsGeoJSON("bufferedOutline", 2)::json AS outline
    FROM areas
    WHERE kind = 'country'
    ORDER BY code ASC;
  `)

  writeFileSync(STATIC_FILE, JSON.stringify(data))
}

export const postprocessGeography = async () => {
  console.log('Building buffered outlines...')
  await buildBufferedOutlines()

  console.log('Building contained points for larger areas...')
  // await buildContainedPoints()

  console.log('Build cointained points for smaller areas...')
  // await buildMissingContainedPointsFromCenters()

  console.log('Exporting static file...')
  await exportToStaticFile()

  console.log('Done!')
}
