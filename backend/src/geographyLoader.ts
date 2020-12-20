import axios from 'axios'
import { database } from './db'
import { Area } from './models/Area'

const GEOJSON_DATA_URL = 'https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson'

interface GeographyFeature {
  properties: {
    ADMIN: string
    ISO_A3: string
  }
  geometry: object
}

interface GeographyDataset {
  features: GeographyFeature[]
}

export const fetchAndLoadGeographyData = async () => {
  console.log(`Downloading geography data...`)
  const { data } = await axios.get(GEOJSON_DATA_URL)

  console.log(`Loading geography data...`)
  loadGeographyData(data)

  console.log(`Geography data loaded!`)
}

const CODE_OVERRIDES = {
  Kosovo: 'OWID_KOS',
} as { [admin: string]: string }

const loadGeographyData = async (source: GeographyDataset) => {
  const transaction = await database.transaction()

  const { features } = source

  for (const feature of features) {
    const {
      properties: { ADMIN, ISO_A3 },
      geometry,
    } = feature

    const code = CODE_OVERRIDES[ADMIN] || ISO_A3

    const [updatedCount] = await Area.update({ geography: geometry }, { where: { code } })

    if (updatedCount === 0) {
      console.log(`                                     No area matches ${ADMIN} / ${ISO_A3}`)
    }
  }

  await transaction.commit()
}
