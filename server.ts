import 'dotenv/config'
import express, { type Request, type Response } from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import loreRoute from './Routes/LoreRoute.ts'

const app = express()
const PORT = process.env.PORT ?? '3000'
const MONGO_URL = process.env.MONGO_URL

// Configs
app.disable('x-powered-by')
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

// Routes
app.get('/', (_req: Request, res: Response) => {
  res.send('Hello World!')
})

app.use('/lore', loreRoute)

app.listen(parseInt(PORT, 10), '::', main)

async function main(): Promise<void> {
  try {
    mongoose.set('strictQuery', true)
    await mongoose.connect(String(MONGO_URL))
    console.log('Successfully connected to DB')
    console.log(`Listening on port ${PORT}`)
  } catch (error) {
    console.log('error connecting to DB', error)
  }
}
