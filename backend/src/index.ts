import dotenv from 'dotenv'
import 'reflect-metadata'
import express from 'express'
import http from 'http'
import { createConnection } from "typeorm"
import { loadAndPersist } from './dataflowkitLoader'

dotenv.config()

createConnection().then(() => {
  const app = express()

  app.set("views", "public")

  app.get("/*", (req, res) => {
    loadAndPersist()
    res.json({ hello: "foo " })
  })

  const server = http.createServer(app)

  server.listen(process.env.PORT, () => {
    console.log('running')
  })
})


