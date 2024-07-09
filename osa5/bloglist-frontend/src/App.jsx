import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch(exception) {
      console.log('ERROR: wrong credentials')
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    setUser(null)
    window.localStorage.removeItem('loggedBlogUser')
  }

  const resetNewBlog = () => {
    setBlogTitle('')
    setBlogAuthor('')
    setBlogUrl('')
  }

  const handleCreateBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl
    }
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        resetNewBlog()
      })
  }

  const loginForm = () => (
    <div>
      <h2>login to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Username"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
  
  const userInfo = () => (
    <div>
      {user.name} logged in
      <button onClick={handleLogout}>logout</button>
    </div>
  )

  const createBlog = () => (
    <div>
      <h2>create new</h2>
      <form>
        <div>
        title:
          <input
            type="text"
            value={blogTitle}
            name="blogTitle"
            onChange={({ target }) => setBlogTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={blogAuthor}
            name="blogAuthor"
            onChange={({ target }) => setBlogAuthor(target.value)}
          />
        </div>
        <div>
          URL:
          <input
            type="text"
            value={blogUrl}
            name="blogUrl"
            onChange={({ target }) => setBlogUrl(target.value)}
          />
        </div>
        <button type="submit" onClick={handleCreateBlog}>create</button>
      </form>
    </div>
  )

  const blogsForm = () => (
    <div>
      <br></br>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  return (
    <div>
      <h2>blogs</h2>
      {!user && loginForm()}
      {user && <div>
          {userInfo()}
          {createBlog()}
          {blogsForm()}
        </div>
      }
      {/* <h2>login to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="text"
            value={password}
            name="Username"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )} */}
    </div>
  )
}

export default App