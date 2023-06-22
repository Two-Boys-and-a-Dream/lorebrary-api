// Add global mocks / pre-testing stuff here
//
jest.mock('mongoose', () => {
    const mocked = jest.createMockFromModule('mongoose')
    return {
        ...mocked,
        model: jest.fn().mockImplementation(() => ({
            createIndexes: jest.fn(),
            create: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            findOneAndUpdate: jest.fn(),
            findById: jest.fn(),
            findByIdAndDelete: jest.fn(),
            findByIdAndUpdate: jest.fn(),
        })),
        connect: jest.fn(),
    }
})

process.env.PORT = 'test'
process.env.MONGO_URL = 'someURLString'
