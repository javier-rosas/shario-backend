const express = require('express')
const cors = require('cors')
const routes = require('./routes/routes.js')
const helmet = require('helmet')

const app = express()
const clientOrigins = [process.env.HOST]

// middleware
app.use(helmet())

app.use(cors({ origin: clientOrigins }))

app.use(express.json({ limit: "50mb" })) //To parse JSON bodies


// use routes
app.use("/api/v1/", routes)
app.use("*", (req, res) => {
  res.status(404).json({ error: "not found" })
});

module.exports = app
