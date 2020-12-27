import { database } from './db'
import { Area } from './models/Area'
import { Metric } from './models/Metric'
import { parse, parseISO, subDays } from 'date-fns'
import axios from 'axios'
import { Worker, QueueScheduler, Queue } from 'bullmq'
import { redis } from './redis'

const FULL_DATA_URL = 'https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/owid-covid-data.json'

const LATEST_DATA_URL =
  'https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/latest/owid-covid-latest.json'

const LATEST_UPDATE_TIMESTAMP_URL =
  'https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/owid-covid-data-last-updated-timestamp.txt'

interface OwidFullDataPoint {
  date: string
  total_cases?: number
  new_cases?: number
  new_cases_smoothed_per_million?: number
  total_tests?: number
  new_tests?: number
  total_deaths?: number
  new_deaths?: number
  new_deaths_smoothed_per_million?: number
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

interface OwidLatestCountry {
  continent: string
  location: string
  population: number
  total_cases?: number
  new_cases?: number
  new_cases_smoothed_per_million?: number
  total_tests?: number
  new_tests?: number
  total_deaths?: number
  new_deaths?: number
  new_deaths_smoothed_per_million?: number
  total_vaccinations?: number
}

interface OwidLatestDataset {
  [countryCode: string]: OwidLatestCountry
}

export const fetchAndLoadLatestData = async () => {
  console.log(`Downloading latest data...`)
  const { data } = await axios.get(LATEST_DATA_URL)

  console.log(`Loading latest data...`)
  await loadLatestData(data)

  console.log(`Latest data loaded!`)
}

const fetchLastUpdateTimestamp = async () => {
  const { data } = await axios.get(LATEST_UPDATE_TIMESTAMP_URL)
  return parseISO(data)
}

const loadLatestData = async (source: OwidLatestDataset) => {
  const updateTimestamp = await fetchLastUpdateTimestamp()
  const date = subDays(updateTimestamp, 1)

  const transaction = await database.transaction()

  for (const code in source) {
    const {
      continent,
      location,
      population,
      total_cases,
      new_cases,
      new_cases_smoothed_per_million,
      total_tests,
      new_tests,
      total_deaths,
      new_deaths,
      new_deaths_smoothed_per_million,
      total_vaccinations,
    } = source[code]

    console.log(`    Loading latest data for ${location}...`)

    const [area] = await Area.upsert(
      { name: location, continent, kind: continent ? 'country' : 'zone', population, code },
      { transaction }
    )

    const totalVaccinations = total_vaccinations || 0

    await Metric.upsert(
      {
        areaId: area.id,
        date,
        totalCases: total_cases || 0,
        newCases: new_cases || 0,
        newCasesPerMillionSmoothed: new_cases_smoothed_per_million || 0,
        totalTests: total_tests || 0,
        newTests: new_tests || 0,
        totalDeaths: total_deaths || 0,
        newDeaths: new_deaths || 0,
        newDeathsPerMillionSmoothed: new_deaths_smoothed_per_million || 0,
        totalVaccinations,
        newVaccinations: totalVaccinations === 0 ? 0 : undefined,
      },
      { transaction }
    )
  }

  await transaction.commit()
}

export const fetchAndLoadFullData = async () => {
  console.log(`Downloading full data...`)
  const { data } = await axios.get(FULL_DATA_URL)

  console.log(`Loading full data...`)
  await loadFullData(data)

  console.log(`Full data loaded!`)
}

const loadFullData = async (source: OwidFullDataset) => {
  const transaction = await database.transaction()

  for (const code in source) {
    const { continent, location, population, data } = source[code]
    console.log(`    Loading full data for ${location}...`)

    const [area] = await Area.upsert(
      { name: location, continent, kind: continent ? 'country' : 'zone', population, code },
      { transaction }
    )

    for (const datapoint of data) {
      const {
        date,
        total_cases,
        new_cases,
        new_cases_smoothed_per_million,
        total_tests,
        new_tests,
        total_deaths,
        new_deaths,
        new_deaths_smoothed_per_million,
        total_vaccinations,
      } = datapoint

      const totalVaccinations = total_vaccinations || 0

      await Metric.upsert(
        {
          areaId: area.id,
          date: parse(date, 'yyyy-MM-dd', new Date()),
          totalCases: total_cases || 0,
          newCases: new_cases || 0,
          newCasesPerMillionSmoothed: new_cases_smoothed_per_million || 0,
          totalTests: total_tests || 0,
          newTests: new_tests || 0,
          totalDeaths: total_deaths || 0,
          newDeaths: new_deaths || 0,
          newDeathsPerMillionSmoothed: new_deaths_smoothed_per_million || 0,
          totalVaccinations,
          newVaccinations: totalVaccinations === 0 ? 0 : undefined,
        },
        { transaction }
      )
    }
  }

  await transaction.commit()
}

export const scheduleRegularUpdates = async () => {
  const queueName = 'owid'
  const connection = redis
  const cron = '*/15 * * * *'

  new QueueScheduler(queueName, { connection })

  const queue = new Queue(queueName, { connection })
  await queue.add('loadData', {}, { repeat: { cron } })

  new Worker(
    queueName,
    async () => {
      const remoteDataUpdatedAt = await fetchLastUpdateTimestamp()
      const localDataUpdatedAt = (await Metric.max('updatedAt')) as Date

      console.log(`Local data updated at ${localDataUpdatedAt}, remote at ${remoteDataUpdatedAt}`)

      if (!localDataUpdatedAt || remoteDataUpdatedAt > localDataUpdatedAt) {
        fetchAndLoadFullData()
      }
    },
    { connection }
  )

  console.log(`Updating data at ${cron}`)
}


