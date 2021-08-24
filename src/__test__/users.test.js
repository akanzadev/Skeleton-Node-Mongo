const supertest = require('supertest')
const mongoose = require('mongoose')
const testServer = require('../utils/testServer')
const api = supertest(testServer)

beforeAll(async () => {
})

describe('Peticiones GET', () => {
  test('/GET /api/users', async () => {
    const res = await api.get('/api/users')
    expect(res.status).toBe(200)
  })
})
describe('Peticion POST', () => {
  test('/POST /api/users enviando data requerida', async () => {
    const res = await api.post('/api/users').send({
      name: 'test1',
      password: 'test1',
      email: 'test154@gmail.com',
      role: 'USER'
    })
    expect(res.status).toBe(201)
  })
  test('/POST /api/users enviando data con posible inyección de scripts', async () => {
    const res = await api.post('/api/users').send({
      name: 'test1',
      password: 'test1',
      email: 'test154@gmail.com',
      role: 'USER',
      script: "<script>console.log('hello')</script>"
    })
    expect(res.status).toBe(400)
  })
  test('/POST /api/users enviando data parcialmente', async () => {
    const res = await api.post('/api/users').send({
      name: 'test',
      email: 'test@gmail.com'
    })
    expect(res.status).toBe(400)
  })
  test('/POST /api/users enviando nada de data', async () => {
    const res = await api.post('/api/users').send({
    })
    expect(res.status).toBe(400)
  })
})
afterAll(async () => {
  await mongoose.connection.close()
})
