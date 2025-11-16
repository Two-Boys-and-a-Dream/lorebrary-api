import { jest, describe, test, expect, beforeEach } from '@jest/globals'
import { DBLore, rawLore } from '../../data/testData.js'

// Mock mongoose module before importing anything that uses it
jest.unstable_mockModule('mongoose', () => ({
  default: {
    Schema: class Schema {
      constructor() {}
    },
    model: jest.fn(),
    connect: jest.fn(),
    set: jest.fn(),
    Types: {
      ObjectId: jest.fn((id) => id),
    },
  },
}))

// Mock Lore model before importing
jest.unstable_mockModule('../../Model/Lore.js', () => ({
  default: {
    find: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    findByIdAndDelete: jest.fn(),
    findByIdAndUpdate: jest.fn(),
  },
}))

// Import mocked module and route handlers
const { default: Lore } = await import('../../Model/Lore.js')
const { getAllLore, getLoreById, createLore, deleteLore, updateLore } =
  await import('../LoreRoute.js')

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
    test('handles success', async () => {
      await getAllLore(req, res)

      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith(DBLore)
    })
    test('handles error', async () => {
      Lore.find.mockRejectedValue(new Error('something'))
      await getAllLore(req, res)

      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.send).toHaveBeenCalledWith('something')
    })
  })
  describe('getLoreById', () => {
    test('handles success', async () => {
      await getLoreById(req, res)

      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith(DBLore[1])
    })
    test('handles error', async () => {
      Lore.findById.mockRejectedValue(new Error('something'))
      await getLoreById(req, res)

      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.send).toHaveBeenCalledWith('something')
    })
  })
  describe('createLore', () => {
    test('handles success', async () => {
      await createLore(req, res)

      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith(DBLore[0])
    })
    test('handles error', async () => {
      Lore.create.mockRejectedValue(new Error('something'))
      await createLore(req, res)

      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.send).toHaveBeenCalledWith('something')
    })
  })

  describe('deleteLore', () => {
    test('handles success', async () => {
      await deleteLore(req, res)

      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.send).toHaveBeenCalled()
    })
    test('handles error', async () => {
      Lore.findByIdAndDelete.mockRejectedValue(new Error('something'))
      await deleteLore(req, res)

      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.send).toHaveBeenCalledWith('something')
    })
  })
  describe('updateLore', () => {
    test('handles success', async () => {
      await updateLore(req, res)

      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith(DBLore[0])
    })
    test('handles error', async () => {
      Lore.findByIdAndUpdate.mockRejectedValue(new Error('something'))
      await updateLore(req, res)

      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.send).toHaveBeenCalledWith('something')
    })
  })
})
