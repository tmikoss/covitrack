import 'reflect-metadata'
import express from 'express'
import http from 'http'
import compression from 'compression'
import { join } from 'path'
import { database } from './db'
import { scheduleRegularUpdates } from './owidLoader'
import { redis } from './redis'
import cacheManager from 'cache-manager'
import cacheManagerIoredis from 'cache-manager-ioredis'

const cache = cacheManager.caching({
  store: cacheManagerIoredis,
  redisInstance: redis,
  ttl: 600
})

const app = express()

app.use(compression())

app.use(express.static(join(__dirname, '../public'), { index: 'index.html' }))

app.get('/api/cases.json', async (_req, res) => {
  const data = await cache.wrap('/api/cases.json', async (cb: (result: any) => void) => {
    const [data] = await database.query(`
      SELECT a.code AS country,
            COALESCE(JSON_OBJECT_AGG(TO_CHAR(m.date, 'YYYYMMDD'), m."newCasesPerMillionSmoothed"), '{}' ) AS "newCases",
            COALESCE(JSON_OBJECT_AGG(TO_CHAR(m.date, 'YYYYMMDD'), m."newDeathsPerMillionSmoothed"), '{}' ) AS "newDeaths"
      FROM metrics m
      JOIN areas a ON m."areaId" = a.id
      GROUP BY a.id
      ORDER BY a.code
    `)

    cb(data)
  })

  res.json(data)
})

app.get('/health-check', (_req, res) => {
  res.end('ok')
})

app.get('/*', (_req, res) => {
  res.redirect('/')
})

const server = http.createServer(app)

server.listen(process.env.PORT, () => {
  console.log(`running on ${process.env.PORT}`)

  scheduleRegularUpdates()
})
