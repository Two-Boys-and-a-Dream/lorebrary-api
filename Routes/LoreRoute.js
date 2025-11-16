const router = require('express').Router()
const mongoose = require('mongoose')
const Lore = require('../Model/Lore')

router.get('/', getAllLore)
router.get('/:id', getLoreById)
router.post('/', createLore)
router.post('/update', updateLore)
router.delete('/:id', deleteLore)

async function getAllLore(_req, res) {
  try {
    const lore = await Lore.find()
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

async function deleteLore(req, res) {
  const { id } = req.params

  try {
    await Lore.findByIdAndDelete(new mongoose.Types.ObjectId(id))
    res.status(200)
    res.send()
  } catch (error) {
    console.log(error)
    res.status(400)
    res.send(error.message)
  }
}

async function updateLore(req, res) {
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
    res.send(error.message)
  }
}

module.exports = router
module.exports.getAllLore = getAllLore
module.exports.getLoreById = getLoreById
module.exports.createLore = createLore
module.exports.deleteLore = deleteLore
module.exports.updateLore = updateLore
