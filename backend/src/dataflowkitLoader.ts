import axios from 'axios'
import { Area } from './models/Area'
import { Metric } from './models/Metric'
import { database } from './db'
import { parse } from 'date-fns'
import numeral from 'numeral'

interface DataflowkitObject {
  "Active Cases_text": string
  "Country_text": string
  "Last Update": string
  "New Cases_text": string
  "New Deaths_text": string
  "Total Cases_text": string
  "Total Deaths_text": string
  "Total Recovered_text": string
}

async function fetchData(): Promise<DataflowkitObject[]> {
  const url = process.env.DATAFLOWKIT_URL!

  const response = await axios.get<DataflowkitObject[]>(url)

  return response.data
}

function toNumber(str: string): number {
  return numeral(str).value()
}

export async function loadAndPersist() {
  const data = await fetchData()

  const transaction = await database.transaction()

  for (const item of data) {
    if (item.Country_text) {
      const [area] = await Area.upsert({ name: item.Country_text }, { transaction })

      await Metric.upsert({
        areaId: area.id,
        date: parse(item["Last Update"], 'yyyy-MM-dd HH:mm', new Date),
        activeCases: toNumber(item["Active Cases_text"]),
        totalCases: toNumber(item["Total Cases_text"]),
        totalDeaths: toNumber(item["Total Deaths_text"]),
        totalRecovered: toNumber(item["Total Recovered_text"])
      }, { transaction })
    }
  }

  await transaction.commit()
}
