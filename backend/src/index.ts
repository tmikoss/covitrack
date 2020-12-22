import dotenv from 'dotenv'
import 'reflect-metadata'
import express from 'express'
import http from 'http'
import { database } from './db'
import compression from 'compression'
import { join } from 'path'

dotenv.config()

const app = express()

app.use(compression())

app.use(express.static(join(__dirname, '../public')))

app.get('/api/cases.json', async (_req, res) => {
  const [data] = await database.query(`
    SELECT a.code AS country,
           COALESCE(JSON_OBJECT_AGG(TO_CHAR(m.date, 'YYYYMMDD'), m."newCasesPerMillionSmoothed"), '{}' ) AS "newCases",
           COALESCE(JSON_OBJECT_AGG(TO_CHAR(m.date, 'YYYYMMDD'), m."newDeathsPerMillionSmoothed"), '{}' ) AS "newDeaths"
    FROM metrics m
    JOIN areas a ON m."areaId" = a.id
    GROUP BY a.id
    ORDER BY a.code
  `)
  res.json(data)
})

app.get('/*', async (_req, res) => {
  res.json({ hello: 'world' })
})

const server = http.createServer(app)

server.listen(process.env.PORT, () => {
  console.log('running')
})
