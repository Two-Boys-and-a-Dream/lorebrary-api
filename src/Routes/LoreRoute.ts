import express, { type Request, type Response, type Router } from 'express'
import { eq } from 'drizzle-orm'
import db from '../db/db.ts'
import {
  LoreInsertSchema,
  LoreSelectSchema,
  LoreUpdateSchema,
  loresTable,
  type NewLore,
  type Lore,
  type UpdateLore,
} from '../db/schema.ts'
import { type ErrorResponse } from '../types/index.ts'

const router: Router = express.Router()

router.get('/', getAllLore)
router.get('/:id', getLoreById)
router.post('/', createLore)
router.post('/update', updateLore)
router.delete('/:id', deleteLore)

async function getAllLore(
  _req: Request,
  res: Response<ErrorResponse | Lore[]>
): Promise<void> {
  try {
    const lore = await db.select().from(loresTable)
    res.status(200).send(lore)
  } catch (error) {
    console.log(error)
    res.status(400).send((error as Error).message)
  }
}

async function getLoreById(
  req: Request<Pick<Lore, 'id'>>,
  res: Response<ErrorResponse | Lore>
): Promise<void> {
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

    const validatedLore = LoreSelectSchema.parse(lore[0])
    res.status(200).send(validatedLore)
  } catch (error) {
    console.log(error)
    res.status(400).send((error as Error).message)
  }
}

async function createLore(
  req: Request<unknown, Lore, NewLore>,
  res: Response<ErrorResponse | Lore>
): Promise<void> {
  const { title, subtitle, game, text } = req.body
  try {
    const newLore = LoreInsertSchema.parse({
      title,
      subtitle,
      game,
      text,
    })

    const rows = await db.insert(loresTable).values(newLore).returning()
    res.status(201).send(rows[0])
  } catch (error) {
    console.log(error)
    res.status(400).send((error as Error).message)
  }
}

async function deleteLore(
  req: Request<Pick<Lore, 'id'>>,
  res: Response<ErrorResponse | void>
): Promise<void> {
  const { id } = req.params

  if (!id) throw new Error('ID is required')

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

async function updateLore(
  req: Request<unknown, Lore, UpdateLore & { id: string }>,
  res: Response<ErrorResponse | Lore>
): Promise<void> {
  const { id, title, subtitle, game, text } = req.body

  if (!id) throw new Error('ID is required')

  try {
    const updatedLore = LoreUpdateSchema.parse({
      title,
      subtitle,
      game,
      text,
    })

    const rows = await db
      .update(loresTable)
      .set(updatedLore)
      .where(eq(loresTable.id, id))
      .returning()

    if (rows.length === 0) {
      res.status(404).send('Lore not found')
      return
    }

    res.status(200).send(rows[0])
  } catch (error) {
    console.log(error)
    res.status(400).send((error as Error).message)
  }
}

export default router
export { getAllLore, getLoreById, createLore, deleteLore, updateLore }
