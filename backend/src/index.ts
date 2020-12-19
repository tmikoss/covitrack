import dotenv from 'dotenv'
import 'reflect-metadata'
import express from 'express'
import http from 'http'
import { database } from './db'

dotenv.config()

const app = express()

app.set('views', 'public')

const dataQuery = `
  SELECT a.name,
         m."totalCases",
         m.date
  FROM metrics m
  JOIN areas a ON m."areaId" = a.id
  WHERE m.date = (SELECT max(date) FROM metrics)
`

app.get('/*', async (req, res) => {
  const [data] = await database.query(dataQuery)
  res.json(data)
})

const server = http.createServer(app)

server.listen(process.env.PORT, () => {
  console.log('running')
})
