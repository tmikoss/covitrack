import dotenv from 'dotenv'
import 'reflect-metadata'
import express from 'express'
import http from 'http'

dotenv.config()

const app = express()

app.set("views", "public")

app.get("/*", (req, res) => {
  res.json({ hello: "foo "})
});

const server = http.createServer(app)

server.listen(process.env.PORT, () => {
  console.log('running')
});


