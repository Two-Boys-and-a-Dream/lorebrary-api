import { timestamp, pgTable, text, uuid, varchar } from 'drizzle-orm/pg-core'
import { sql } from 'drizzle-orm'
import {
  createSelectSchema,
  createInsertSchema,
  createUpdateSchema,
} from 'drizzle-zod'

export const loresTable = pgTable('lores', {
  id: uuid()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  title: varchar({ length: 255 }).notNull(),
  subtitle: varchar({ length: 255 }).notNull().default('N/A'),
  game: varchar({ length: 255 }).notNull().default('N/A'),
  text: text().notNull(),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp()
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
})

export const LoreSelectSchema = createSelectSchema(loresTable)
export const LoreInsertSchema = createInsertSchema(loresTable)
export const LoreUpdateSchema = createUpdateSchema(loresTable)
export type Lore = typeof loresTable.$inferSelect
export type NewLore = typeof loresTable.$inferInsert
export type UpdateLore = Partial<typeof loresTable.$inferInsert>
