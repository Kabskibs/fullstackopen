const { test, after, describe, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./api_test_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('database tests', () => {
  test('there are three posts', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })
})

describe('api tests', () => {
  test('get - right amount of posts', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })

  test('get - response is in json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('get - first posts title is correct', async () => {
    const response = await api.get('/api/blogs')
    const titles = response.body.map(post => post.title)
    assert.strictEqual(titles[0], helper.initialBlogs[0].title)
  })

  test('get - bodys id is in right format', async () => {
    const response = await api.get('/api/blogs')
    const keys = Object.keys(response.body[0])
    assert(!keys.includes('_id'))
  })

  test('post - valid post can be added', async () => {
    const newBlog = {
      title: "api_test_valid_post",
      author: "valid ASD",
      url: "apitest.test",
      likes: "30"
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const response = await api.get('/api/blogs')
    const titles = response.body.map(post => post.title)
    assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)
    assert(titles.includes('api_test_valid_post'))
  })

  test('post - 0 added if no likes specified', async () => {
    const newBlog = {
      title: "api_test_nolikes_post",
      author: "nolikes ASD",
      url: "apitest.test"
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const response = await api.get('/api/blogs')
    const lastElement = response.body[response.body.length - 1]
    assert.strictEqual(lastElement.likes, 0)
  })

  test('post - 400 if no title field', async () => {
    const newBlog = {
      author: "nolikes ASD",
      url: "apitest.test",
      likes: 123
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })

  test('post - 400 if no URL field', async () => {
    const newBlog = {
      author: "nolikes ASD",
      title: "valid title",
      likes: 123
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })
})

after(async () => {
  await mongoose.connection.close()
})
