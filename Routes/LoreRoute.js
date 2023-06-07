const router = require('express').Router()
const mongoose = require('mongoose')
const Lore = require('../Model/Lore')

router.get('/', async (req, res) => {
    try {
        let lore = await Lore.find()
        res.status(200).json(lore)
    } catch (error) {
        console.log(error)
        res.status(400).send(error.message)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const lore = await Lore.findById(
            new mongoose.Types.ObjectId(req.params.id)
        )
        res.status(200).json(lore)
    } catch (error) {
        console.log(error)
        res.status(400).send(error.message)
    }
})

router.post('/', async (req, res) => {
    try {
        const { title, subtitle, game, text } = req.body
        const lore = await Lore.create({
            title: title,
            subtitle: subtitle,
            game: game,
            text: text,
        })
        res.status(200).json(lore)
    } catch (error) {
        console.log(error)
        res.status(400).send(error.message)
    }
})

module.exports = router
