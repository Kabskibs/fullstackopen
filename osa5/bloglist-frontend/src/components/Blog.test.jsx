import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { expect } from 'vitest'

test('<Blog /> renders title', () => {
  const blog = {
    title: 'Test Title',
    author: 'Test Author',
  }
  // The ones below are not required for testing,
  // but will cause warnings if not included
  const blogUser = { username: 'username' }
  const funcOne = () => { return null }
  const funcTwo = () => { return null }
  
  const { container } = render(
    <Blog
      blog={blog}
      // To avoid warnings, as stated above
      user={blogUser}
      handleAddLikes={funcOne}
      handleRemoveBlog={funcTwo}  
    />
  )

  const div = container.querySelector('.blogPostBox')

  expect(div).toHaveTextContent(
    'Test Title'
  ) && expect(div).toHaveTextContent(
    'Test Author'
  )
})

test('<Blog /> view button works and content is rendered', async () => {
  const blog = {
    title: 'Test Title',
    author: 'Test Author',
    url: 'test.url',
    user: {
      name: "Test Name"
    }
  }
  // The ones below are not required for testing,
  // but will cause warnings if not included
  const blogUser = { username: 'username' }
  const funcOne = () => { return null }
  const funcTwo = () => { return null }
  
  const { container } = render(
    <Blog
      blog={blog}
      // To avoid warnings, as stated above
      user={blogUser}
      handleAddLikes={funcOne}
      handleRemoveBlog={funcTwo}  
    />
  )

  const div = container.querySelector('.blogPostBox')

  const user = userEvent.setup()
  const button = screen.getByText('view')

  expect(div).not.toHaveTextContent(
    'test.url'
  ) && expect(div).not.toHaveTextContent(
    'Test Name'
  )
  await user.click(button)
  expect(div).toHaveTextContent(
    'Test Title'
  ) && expect(div).toHaveTextContent(
    'Test Author'
  ) && expect(div).toHaveTextContent(
    'test.url'
  ) && expect(div).toHaveTextContent(
    'Test Name'
  )
})