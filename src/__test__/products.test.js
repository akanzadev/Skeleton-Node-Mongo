const supertest = require('supertest')
const mongoose = require('mongoose')
const testServer = require('../utils/testServer')
const api = supertest(testServer)

beforeAll(async () => {
})

describe('Peticiones GET', () => {
  test('/GET /api/products', async () => {
    const res = await api.get('/api/products')
    expect(res.status).toBe(200)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
