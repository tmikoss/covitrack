import axios from 'axios'
import { database } from './db'
import { Area } from './models/Area'
import { readFileSync } from 'fs'
import { join } from 'path'

// World Bank has better data, but is missing Taiwan. Load datahub, then replace with WorldBank where possible
const GEOJSON_DATA_URL = 'https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson'
const GEOJSON_DATA_FILE = join(__dirname, '../src/data/WB_countries_Admin0.geojson')

interface GeographyFeature {
  properties: {
    ADMIN: string
    WB_NAME: string
    ISO_A3: string
  }
  geometry: object
}

interface GeographyDataset {
  features: GeographyFeature[]
}

export const fetchAndLoadGeographyData = async () => {
  console.log(`Downloading datahub.io data...`)
  const { data } = await axios.get(GEOJSON_DATA_URL)

  console.log(`Loading datahub.io data...`)
  await loadGeographyData(data, 'ADMIN')

  const wbData = JSON.parse(readFileSync(GEOJSON_DATA_FILE, 'utf8'))

  console.log(`Loading World Bank data...`)
  await loadGeographyData(wbData, 'WB_NAME')

  console.log(`Geography data loaded!`)
}

const CODE_OVERRIDES = {
  Kosovo: 'OWID_KOS',
  France: 'FRA',
  Norway: 'NOR',
} as { [admin: string]: string }

const BAD_DATA = {
  WB_NAME: {
    RUS: true,
    MAR: true,
  } as any,
  ADMIN: {} as any,
}

const loadGeographyData = async (source: GeographyDataset, nameProperty: 'WB_NAME' | 'ADMIN') => {
  const transaction = await database.transaction()

  const { features } = source

  for (const feature of features) {
    const { properties, geometry } = feature

    const iso = properties.ISO_A3
    const name = properties[nameProperty]

    const code = CODE_OVERRIDES[name] || iso

    if (BAD_DATA[nameProperty][code]) {
      continue
    }

    const [updatedCount] = await Area.update({ geography: geometry }, { where: { code } })

    if (updatedCount === 0) {
      console.log(`                                     No area matches ${name} / ${iso}`)
    }
  }

  await transaction.commit()
}
