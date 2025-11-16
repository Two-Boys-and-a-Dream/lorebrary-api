import { vi, describe, test, expect, beforeEach } from 'vitest'
import { type Request, type Response } from 'express'
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
      ObjectId: class ObjectId {
        constructor(id: string) {
          return id as unknown as typeof ObjectId
        }
      },
    },
  },
}))

// Mock Lore model before importing
const mockLore = {
  find: vi.fn(),
  findById: vi.fn(),
  create: vi.fn(),
  findByIdAndDelete: vi.fn(),
  findByIdAndUpdate: vi.fn(),
}

vi.mock('../../Model/Lore.js', () => ({
  default: mockLore,
}))

// Import mocked module and route handlers
const { default: Lore } = await import('../../Model/Lore.js')
const LoreMock = Lore as unknown as typeof mockLore
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
} as unknown as Request

const res = {
  status: vi.fn().mockReturnThis(),
  send: vi.fn(),
  json: vi.fn(),
} as unknown as Response

beforeEach(() => {
  LoreMock.find.mockResolvedValue(DBLore)
  LoreMock.findById.mockResolvedValue(DBLore[1])
  LoreMock.create.mockResolvedValue(DBLore[0])
  LoreMock.findByIdAndUpdate.mockResolvedValue(DBLore[0])
})

describe('LoreRoute', () => {
  describe('getAllLore', () => {
    test('handles success', async () => {
      await getAllLore(req, res)

      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith(DBLore)
    })
    test('handles error', async () => {
      LoreMock.find.mockRejectedValue(new Error('something'))
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
      LoreMock.findById.mockRejectedValue(new Error('something'))
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
      LoreMock.create.mockRejectedValue(new Error('something'))
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
      LoreMock.findByIdAndDelete.mockRejectedValue(new Error('something'))
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
      LoreMock.findByIdAndUpdate.mockRejectedValue(new Error('something'))
      await updateLore(req, res)

      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.send).toHaveBeenCalledWith('something')
    })
  })
})
