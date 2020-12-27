import 'reflect-metadata'
import express from 'express'
import http from 'http'
import compression from 'compression'
import { join } from 'path'

const app = express()

app.use(compression())

app.use(express.static(join(__dirname, '../public'), { index: 'index.html' }))

app.get('/health-check', (_req, res) => {
  res.end('ok')
})

app.get('/*', (_req, res) => {
  res.redirect('/')
})

const server = http.createServer(app)

server.listen(process.env.PORT, () => {
  console.log('running')
})
