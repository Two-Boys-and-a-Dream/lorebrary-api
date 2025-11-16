// Mock for mongoose module
export default {
  Schema: class Schema {
    constructor() {}
  },
  model: jest.fn(),
  connect: jest.fn(),
  set: jest.fn(),
  Types: {
    ObjectId: jest.fn((id) => id),
  },
}
