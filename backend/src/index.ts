import dotenv from 'dotenv'
import 'reflect-metadata'
import express from 'express'
import http from 'http'
import { database } from './db'
import compression from 'compression'

dotenv.config()

const app = express()

app.use(compression())

app.set('views', 'public')

app.get('/api/countries', async (_req, res) => {
  const [data] = await database.query(`
    SELECT a.code,
           a.name,
           ST_AsGeoJSON(a.geography, 3)::json geography
    FROM areas a
    WHERE a.kind = 'country'
    ORDER BY a.code
  `)
  res.json(data)
})

app.get('/api/totalcases', async (_req, res) => {
  const [data] = await database.query(`
    SELECT a.code AS country,
           COALESCE(JSON_OBJECT_AGG(TO_CHAR(m.date, 'YYYYMMDD'), m."totalCases"), '{}' ) AS "totalCases"
    FROM metrics m
    JOIN areas a ON m."areaId" = a.id
    WHERE a.kind = 'country'
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
