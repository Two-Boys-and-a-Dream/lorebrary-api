require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const { PORT, MONGO_URL } = process.env

// Configs
app.disable('x-powered-by')
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

// Routes
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(PORT, main)

async function main() {
    try {
        mongoose.set('strictQuery', true)
        await mongoose.connect(MONGO_URL)
        console.log('Successfully connected to DB')
        console.log(`Listening on port ${PORT}`)
    } catch (error) {
        console.log('error connecting to DB', error)
    }
}
