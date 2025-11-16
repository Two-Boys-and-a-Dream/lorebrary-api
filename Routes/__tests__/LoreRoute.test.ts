import { vi, describe, test, expect, beforeEach } from 'vitest'
import { DBLore, rawLore } from '../../data/testData.ts'

// Mock mongoose module before importing anything that uses it
vi.mock('mongoose', () => ({
  default: {
    Schema: class Schema {
      constructor() {}
    },
    model: vi.fn(),
    connect: vi.fn(),
    set: vi.fn(),
    Types: {
      ObjectId: vi.fn((id) => id),
    },
  },
}))

// Mock Lore model before importing
vi.mock('../../Model/Lore.js', () => ({
  default: {
    find: vi.fn(),
    findById: vi.fn(),
    create: vi.fn(),
    findByIdAndDelete: vi.fn(),
    findByIdAndUpdate: vi.fn(),
  },
}))

// Import mocked module and route handlers
const { default: Lore } = await import('../../Model/Lore.js')
const { getAllLore, getLoreById, createLore, deleteLore, updateLore } =
  await import('../LoreRoute.js')

const testLore = DBLore[1]
const testRawLore = rawLore[0]

const req = {
  params: {
    id: testLore?._id,
  },
  body: {
    ...testRawLore,
  },
}

const res = {
  status: vi.fn(),
  send: vi.fn(),
  json: vi.fn(),
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
