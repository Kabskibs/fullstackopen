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
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Test User 2',
        username: 'test_user2',
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

    test('Logged in user can remove their own post', async ({ page }) => {
      loginWith(page, 'test_user1', 'test_password')
      createBlog(page, 'Blog Title', 'Author Name', 'blog.url')
      await page.getByRole('button', { name: 'view' }).click()
      await page.on('dialog', dialog => dialog.accept())
      await page.getByRole('button', { name: 'remove' }).click()
      await expect(page.getByText('Successfully removed blog')).toBeVisible()
      await page.reload()
      await expect(page.getByText('Blog Title Author Name')).not.toBeVisible()
    })

    test('Logged in user cannot remove other users post', async ({ page }) => {
      await loginWith(page, 'test_user1', 'test_password')
      await createBlog(page, 'Blog Title', 'Author Name', 'blog.url')
      await page.getByRole('button', { name: 'logout' }).click()
      await expect(page.getByText('login to application')).toBeVisible()
      await loginWith(page, 'test_user2', 'test_password')
      await page.getByRole('button', { name: 'view' }).click()
      await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()
    })

    test('Blogs are correctly ordered by likes', async ({ page }) => {
      await loginWith(page, 'test_user1', 'test_password')
      await createBlog(page, 'Blog 1', 'Author 1', 'blog.1')
      await createBlog(page, 'Blog 2', 'Author 2', 'blog.2')
      await createBlog(page, 'Blog 3', 'Author 3', 'blog.3')
      const blogOne = await page.getByText('Blog 1 Author 1')
      const blogTwo = await page.getByText('Blog 2 Author 2')
      const blogThree = await page.getByText('Blog 3 Author 3')
      await blogOne.getByRole('button', { name: 'view' }).click()
      await blogTwo.getByRole('button', { name: 'view' }).click()
      await blogThree.getByRole('button', { name: 'view' }).click()
      await expect(page.getByTestId('blogPostBox').nth(0)).toContainText('Blog 1 Author 1')
      await expect(page.getByTestId('blogPostBox').nth(1)).toContainText('Blog 2 Author 2')
      await expect(page.getByTestId('blogPostBox').nth(2)).toContainText('Blog 3 Author 3')
      await blogThree.getByRole('button', { name: 'like' }).click()
      await expect(page.getByTestId('blogPostBox').nth(0)).toContainText('Blog 3 Author 3')
      await expect(page.getByTestId('blogPostBox').nth(1)).toContainText('Blog 1 Author 1')
      await expect(page.getByTestId('blogPostBox').nth(2)).toContainText('Blog 2 Author 2')
    })
  })
})