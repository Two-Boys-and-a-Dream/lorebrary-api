const Lore = require('../../Model/Lore')
const { DBLore, rawLore } = require('../../data/testData')
const {
  getAllLore,
  getLoreById,
  createLore,
  deleteLore,
  updateLore,
} = require('../LoreRoute')

jest.mock('../../Model/Lore.js')

const req = {
  params: {
    id: DBLore[1]._id,
  },
  body: {
    ...rawLore[0],
  },
}

const res = {
  status: jest.fn(),
  send: jest.fn(),
  json: jest.fn(),
}

beforeEach(() => {
  Lore.find.mockResolvedValue(DBLore)
  Lore.findById.mockResolvedValue(DBLore[1])
  Lore.create.mockResolvedValue(DBLore[0])
  Lore.findByIdAndUpdate.mockResolvedValue(DBLore[0])
})

describe('LoreRoute', () => {
  describe('getAllLore', () => {
    it('handles success', async () => {
      await getAllLore(req, res)

      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith(DBLore)
    })
    it('handles error', async () => {
      Lore.find.mockRejectedValue(new Error('something'))
      await getAllLore(req, res)

      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.send).toHaveBeenCalledWith('something')
    })
  })
  describe('getLoreById', () => {
    it('handles success', async () => {
      await getLoreById(req, res)

      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith(DBLore[1])
    })
    it('handles error', async () => {
      Lore.findById.mockRejectedValue(new Error('something'))
      await getLoreById(req, res)

      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.send).toHaveBeenCalledWith('something')
    })
  })
  describe('createLore', () => {
    it('handles success', async () => {
      await createLore(req, res)

      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith(DBLore[0])
    })
    it('handles error', async () => {
      Lore.create.mockRejectedValue(new Error('something'))
      await createLore(req, res)

      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.send).toHaveBeenCalledWith('something')
    })
  })

  describe('deleteLore', () => {
    it('handles success', async () => {
      await deleteLore(req, res)

      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.send).toHaveBeenCalled()
    })
    it('handles error', async () => {
      Lore.findByIdAndDelete.mockRejectedValue(new Error('something'))
      await deleteLore(req, res)

      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.send).toHaveBeenCalledWith('something')
    })
  })
  describe('updateLore', () => {
    it('handles success', async () => {
      await updateLore(req, res)

      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith(DBLore[0])
    })
    it('handles error', async () => {
      Lore.findByIdAndUpdate.mockRejectedValue(new Error('something'))
      await updateLore(req, res)

      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.send).toHaveBeenCalledWith('something')
    })
  })
})
