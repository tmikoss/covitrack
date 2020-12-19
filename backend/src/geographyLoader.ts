import { readFileSync } from 'fs'
import { join } from 'path'
import { database } from './db'
import { Area } from './models/Area'

const GEOJSON_FILE = join(__dirname, '../sample/countries.geojson')

interface GeographyFeature {
  properties: {
    ADMIN: string
    ISO_A3: string
  }
  geometry: object
}

export const updateGeography = async () => {
  console.log('Reading GeoJSON file...')

  const { features } = JSON.parse(readFileSync(GEOJSON_FILE, { encoding: 'utf-8' })) as { features: GeographyFeature[] }

  const transaction = await database.transaction()

  for (const feature of features) {
    const {
      properties: { ADMIN, ISO_A3 },
      geometry,
    } = feature

    const [updatedCount] = await Area.update(
      { geography: geometry },
      {
        where: { code: ISO_A3 },
      }
    )

    if (updatedCount === 0) {
      console.log(`                                     No area matches ${ADMIN} / ${ISO_A3}`)
    }
  }

  await transaction.commit()
}
