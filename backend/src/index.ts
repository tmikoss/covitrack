import dotenv from 'dotenv'
import 'reflect-metadata'
import express from 'express'
import http from 'http'
import { database } from './db'

dotenv.config()

const app = express()

app.set('views', 'public')

app.get('/api/countries', async (_req, res) => {
  const [data] = await database.query(`
    SELECT a.id,
           a.name,
           ST_AsGeoJSON(a.geography, 4) geography
    FROM areas a
    WHERE a.kind = 'country'
  `)
  res.json(data)
})

app.get('/api/totalcases', async (_req, res) => {
  const [data] = await database.query(`
    SELECT a.id AS countryId,
           COALESCE(JSON_OBJECT_AGG(m.date, m."totalCases"), '{}' ) AS totalCases
    FROM metrics m
    JOIN areas a ON m."areaId" = a.id
    WHERE a.kind = 'country'
    GROUP BY a.id
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
