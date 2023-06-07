const { Schema, model } = require('mongoose')

const LoreSchema = new Schema({
    title: { type: String, require: true },
    subtitle: { type: String, require: true },
    game: { type: String, require: true },
    date: { type: Date, require: true },
    text: { type: String, require: true },
    createdAt: { type: Date, require: true },
    updatedAt: { type: Date, require: true },
})

module.export = model('Lore', LoreSchema)
