const mongoose = require('mongoose')

const LoreSchema = new mongoose.Schema({
    title: { type: String, require: true },
    subtitle: { type: String, require: true },
    game: { type: String, require: true },
    text: { type: String, require: true },
    createdAt: { type: Date, require: true, default: new Date() },
    updatedAt: { type: Date, require: true, default: new Date() },
})

module.exports = mongoose.model('Lore', LoreSchema)
