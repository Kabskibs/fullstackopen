import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import { expect } from 'vitest'

test('<Blog /> renders title', () => {
  const blog = {
    title: 'Test Title',
    author: 'Test Author',
  }
  // The ones below are not required for testing,
  // but will cause warnings if not included
  const user = { username: 'username' }
  const funcOne = () => { return null }
  const funcTwo = () => { return null }
  
  const { container } = render(
    <Blog
      blog={blog}
      // To avoid warnings, as stated above
      user={user}
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