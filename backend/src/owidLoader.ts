import { database } from './db'
import { Area } from './models/Area'
import { Metric } from './models/Metric'
import { parse } from 'date-fns'

interface OwidFullDataPoint {
  date: string
  total_cases?: number
  new_cases?: number
  total_tests?: number
  new_tests?: number
  total_deaths?: number
  new_deaths?: number
  total_vaccinations?: number
}

interface OwidFullCountry {
  continent: string
  location: string
  population: number
  data: OwidFullDataPoint[]
}

interface OwidFullDataset {
  [countryCode: string]: OwidFullCountry
}

const loadFullOwidData = async (source: OwidFullDataset) => {
  const transaction = await database.transaction()

  for (const code in source) {
    const { continent, location, population, data } = source[code]

    const [area] = await Area.upsert({ name: location, continent, kind: 'country', population }, { transaction })

    for (const datapoint of data) {
      const { date, total_cases, new_cases, total_tests, new_tests, total_deaths, new_deaths, total_vaccinations } = datapoint

      const totalVaccinations = total_vaccinations || 0

      await Metric.upsert(
        {
          areaId: area.id,
          date: parse(date, 'yyyy-MM-dd', new Date()),
          totalCases: total_cases || 0,
          newCases: new_cases || 0,
          totalTests: total_tests || 0,
          newTests: new_tests || 0,
          totalDeaths: total_deaths || 0,
          newDeaths: new_deaths || 0,
          totalVaccinations,
          newVaccinations: totalVaccinations === 0 ? 0 : undefined
        },
        { transaction }
      )
    }
  }

  await transaction.commit()
}
