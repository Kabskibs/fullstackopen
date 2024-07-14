const loginWith = async (page, username, password)  => {
  await page.getByTestId('username').fill(username)
  await page.getByTestId('password').fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}

const createBlog = async (page, blogTitle, blogAuthor, blogUrl) => {
  await page.getByRole('button', { name: 'new blog' }).click()
  await page.getByTestId('blog_title').fill(blogTitle)
  await page.getByTestId('blog_author').fill(blogAuthor)
  await page.getByTestId('blog_url').fill(blogUrl)
  await page.getByRole('button', { name: 'create' }).click()
}

export { loginWith, createBlog }