const { test, expect, beforeEach, describe } = require('@playwright/test')

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
      await page.getByTestId('username').fill('test_user1')
      await page.getByTestId('password').fill('test_password')
      await page.getByRole('button', { name: 'login' }).click()
      await expect(page.getByText('Test User logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByTestId('username').fill('wrong_user')
      await page.getByTestId('password').fill('wrong_password')
      await page.getByRole('button', { name: 'login' }).click()
      await expect(page.getByText('Wrong username or password')).toBeVisible()
    })
  })

})