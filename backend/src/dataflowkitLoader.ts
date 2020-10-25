import axios from 'axios'
import { Area } from './entity/Area'
import { Metric } from './entity/Metric'
import { getConnection } from "typeorm"

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

export async function loadAndPersist() {
  const data = await fetchData()



  const connection = getConnection()

  await connection.transaction(async entityManager => {
    const queryBuilder = entityManager.createQueryBuilder()

    data.forEach(item => {
      const area = queryBuilder.insert().into(Area).values([{ name: item.Country_text }]).onConflict(`("name") DO NOTHING`).execute()

      console.log(area)

    })
  })





  // await getConnection()
  //   .createQueryBuilder()
  //   .insert()
  //   .into(User)
  //   .values([
  //     { firstName: "Timber", lastName: "Saw" },
  //     { firstName: "Phantom", lastName: "Lancer" }
  //   ])
  //   .execute();
}
