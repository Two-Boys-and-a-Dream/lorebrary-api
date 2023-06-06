require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const { PORT } = process.env

// Configs
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

// Routes
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})
