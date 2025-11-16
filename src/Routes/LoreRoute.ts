import express, { type Request, type Response, type Router } from 'express'
import { eq } from 'drizzle-orm'
import db from '../db/db.ts'
import { loresTable } from '../db/schema.ts'

const router: Router = express.Router()

router.get('/', getAllLore)
router.get('/:id', getLoreById)
router.post('/', createLore)
router.post('/update', updateLore)
router.delete('/:id', deleteLore)

async function getAllLore(_req: Request, res: Response): Promise<void> {
  try {
    const lore = await db.select().from(loresTable)
    res.status(200).send(lore)
  } catch (error) {
    console.log(error)
    res.status(400).send((error as Error).message)
  }
}

async function getLoreById(req: Request, res: Response): Promise<void> {
  const { id } = req.params

  if (!id) {
    res.status(400).send('ID is required')
    return
  }

  try {
    const lore = await db
      .select()
      .from(loresTable)
      .where(eq(loresTable.id, id))
      .limit(1)

    if (lore.length === 0) {
      res.status(404).send('Lore not found')
      return
    }

    res.status(200).send(lore[0])
  } catch (error) {
    console.log(error)
    res.status(400).send(error as Error)
  }
}

async function createLore(req: Request, res: Response): Promise<void> {
  const { title, subtitle, game, text } = req.body
  try {
    const newLore = {
      title: title.toString(),
      subtitle: subtitle?.toString() || 'N/A',
      game: game?.toString() || 'N/A',
      text: text.toString(),
    }

    const lore = await db.insert(loresTable).values(newLore).returning()
    res.status(200).send(lore[0])
  } catch (error) {
    console.log(error)
    res.status(400).send((error as Error).message)
  }
}

async function deleteLore(req: Request, res: Response): Promise<void> {
  const { id } = req.params

  if (!id) {
    res.status(400).send('ID is required')
    return
  }

  try {
    const result = await db
      .delete(loresTable)
      .where(eq(loresTable.id, id))
      .returning()

    if (result.length === 0) {
      res.status(404).send('Lore not found')
      return
    }

    res.status(200).send()
  } catch (error) {
    console.log(error)
    res.status(400).send((error as Error).message)
  }
}

async function updateLore(req: Request, res: Response): Promise<void> {
  const { id, title, subtitle, game, text } = req.body

  if (!id) {
    res.status(400).send('ID is required')
    return
  }

  try {
    const updatedLore: {
      title?: string
      subtitle?: string
      game?: string
      text?: string
    } = {
      title,
      subtitle,
      game,
      text,
    }

    const lore = await db
      .update(loresTable)
      .set(updatedLore)
      .where(eq(loresTable.id, id))
      .returning()

    if (lore.length === 0) {
      res.status(404).send('Lore not found')
      return
    }

    res.status(200).json(lore[0])
  } catch (error) {
    console.log(error)
    res.status(400).send((error as Error).message)
  }
}

export default router
export { getAllLore, getLoreById, createLore, deleteLore, updateLore }
