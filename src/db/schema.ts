import { timestamp, pgTable, text, uuid, varchar } from 'drizzle-orm/pg-core'
import { sql } from 'drizzle-orm'

export const loresTable = pgTable('lores', {
  id: uuid()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  title: varchar({ length: 255 }).notNull(),
  subtitle: varchar({ length: 255 }).notNull().default('N/A'),
  game: varchar({ length: 255 }).notNull().default('N/A'),
  text: text().notNull(),
  createdAt: timestamp({ mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp({ mode: 'string' }).notNull().defaultNow(),
})
