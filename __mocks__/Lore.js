// Manual mock for Lore model
const mockFn = () => {
  const fn = function () {}
  fn.mockResolvedValue = function (value) {
    this._resolvedValue = value
    return this
  }
  fn.mockRejectedValue = function (value) {
    this._rejectedValue = value
    return this
  }
  return fn
}

export default {
  find: mockFn(),
  findById: mockFn(),
  create: mockFn(),
  findByIdAndDelete: mockFn(),
  findByIdAndUpdate: mockFn(),
}
