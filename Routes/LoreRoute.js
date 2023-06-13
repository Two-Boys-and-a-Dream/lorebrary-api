const router = require('express').Router()
const mongoose = require('mongoose')
const Lore = require('../Model/Lore')

router.get('/', getAllLore)
router.get('/:id', getLoreById)
router.post('/', createLore)

async function getAllLore(_req, res) {
    try {
        let lore = await Lore.find()
        res.status(200)
        res.json(lore)
    } catch (error) {
        console.log(error)
        res.status(400)
        res.send(error.message)
    }
}

async function getLoreById(req, res) {
    const { id } = req.params
    try {
        const lore = await Lore.findById(new mongoose.Types.ObjectId(id))
        res.status(200)
        res.json(lore)
    } catch (error) {
        console.log(error)
        res.status(400)
        res.send(error.message)
    }
}

async function createLore(req, res) {
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
        res.send(error.message)
    }
}

module.exports = router
module.exports.getAllLore = getAllLore
module.exports.getLoreById = getLoreById
module.exports.createLore = createLore
