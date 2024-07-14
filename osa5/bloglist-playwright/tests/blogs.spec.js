const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./blogsHelper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http:localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Test User',
        username: 'test_user1',
        password: 'test_password'
      }
    })

    await page.goto('http://localhost:5173')
  })
  test('Login form is shown', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'login to application' })).toBeVisible();
    await expect(page.getByText('username')).toBeVisible();
    await expect(page.locator('input[type="text"]')).toBeVisible();
    await expect(page.getByText('password')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible();
  })
  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      loginWith(page, 'test_user1', 'test_password')
      await expect(page.getByText('Test User logged in')).toBeVisible()
    })
    test('fails with wrong credentials', async ({ page }) => {
      loginWith(page, 'wrong_username', 'wrong_password')
      await expect(page.getByText('Wrong username or password')).toBeVisible()
    })
  })
  describe('Blog-posts', () => {
    test('Logged in user can create a blog post', async ({ page }) => {
      loginWith(page, 'test_user1', 'test_password')
      createBlog(page, 'Blog Title', 'Author Name', 'blog.url')
      await expect(page.getByText('Blog Title Author Name')).toBeVisible()
    })

    test('Logged in user can like a post', async ({ page }) => {
      loginWith(page, 'test_user1', 'test_password')
      createBlog(page, 'Blog Title', 'Author Name', 'blog.url')
      await page.getByRole('button', { name: 'view' }).click()
      await expect(page.getByText('likes 0')).toBeVisible()
      await page.getByRole('button', { name: 'like' }).click()
      await expect(page.getByText('likes 1')).toBeVisible()
    })
  })
})