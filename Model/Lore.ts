import mongoose, { Schema, Document, Model } from 'mongoose'

export interface ILore {
  title: string
  subtitle: string
  game: string
  text: string
  createdAt: Date
  updatedAt: Date
}

export interface ILoreDocument extends ILore, Document {}

const LoreSchema: Schema<ILoreDocument> = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  game: { type: String, required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
  updatedAt: { type: Date, required: true, default: Date.now },
})

const LoreModel: Model<ILoreDocument> = mongoose.model<ILoreDocument>(
  'Lore',
  LoreSchema
)

export default LoreModel
