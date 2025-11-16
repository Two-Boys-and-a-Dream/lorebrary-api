import express, { type Request, type Response, type Router } from 'express'
import mongoose from 'mongoose'
import Lore from '../Model/Lore.ts'

const router: Router = express.Router()

router.get('/', getAllLore)
router.get('/:id', getLoreById)
router.post('/', createLore)
router.post('/update', updateLore)
router.delete('/:id', deleteLore)

async function getAllLore(_req: Request, res: Response): Promise<void> {
  try {
    const lore = await Lore.find()
    res.status(200)
    res.json(lore)
  } catch (error) {
    console.log(error)
    res.status(400)
    res.send((error as Error).message)
  }
}

async function getLoreById(req: Request, res: Response): Promise<void> {
  const { id } = req.params
  try {
    const lore = await Lore.findById(new mongoose.Types.ObjectId(id))
    res.status(200)
    res.json(lore)
  } catch (error) {
    console.log(error)
    res.status(400)
    res.send((error as Error).message)
  }
}

async function createLore(req: Request, res: Response): Promise<void> {
  const { title, subtitle, game, text } = req.body
  try {
    const newLore = {
      title: title.toString(),
      subtitle: subtitle.toString(),
      game: game.toString(),
      text: text.toString(),
    }

    const lore = await Lore.create(newLore)
    res.status(200)
    res.json(lore)
  } catch (error) {
    console.log(error)
    res.status(400)
    res.send((error as Error).message)
  }
}

async function deleteLore(req: Request, res: Response): Promise<void> {
  const { id } = req.params

  try {
    await Lore.findByIdAndDelete(new mongoose.Types.ObjectId(id))
    res.status(200)
    res.send()
  } catch (error) {
    console.log(error)
    res.status(400)
    res.send((error as Error).message)
  }
}

async function updateLore(req: Request, res: Response): Promise<void> {
  const { _id, title, subtitle, game, text } = req.body
  try {
    const updatedLore = {
      title: title?.toString(),
      subtitle: subtitle?.toString(),
      game: game?.toString(),
      text: text?.toString(),
      updatedAt: new Date(),
    }

    const lore = await Lore.findByIdAndUpdate(
      new mongoose.Types.ObjectId(_id),
      updatedLore,
      { new: true }
    )
    res.status(200)
    res.json(lore)
  } catch (error) {
    console.log(error)
    res.status(400)
    res.send((error as Error).message)
  }
}

export default router
export { getAllLore, getLoreById, createLore, deleteLore, updateLore }
