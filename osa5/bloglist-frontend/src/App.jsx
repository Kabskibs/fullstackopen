import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import CreateBlog from './components/CreateBlog'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')
  const [notification, setNotification] = useState(null)
  const [notificationState, setNotificationState] = useState(0)

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
      setNotification(`Logged in as ${user.username}`)
      setTimeout(() => {
        setNotification(null)
      }, 5000);
    } catch(exception) {
      setNotificationState(-1)
      setNotification(`Wrong username or password`)
      setTimeout(() => {
        setNotification(null)
        setNotificationState(0)
      }, 5000);
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    setUser(null)
    window.localStorage.removeItem('loggedBlogUser')
    setNotification(`Logged out`)
      setTimeout(() => {
        setNotification(null)
      }, 5000);
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
   createBlogRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        resetNewBlog()
        setNotification(`Successfully added blog "${blogObject.title}" by ${blogObject.author}`)
        setTimeout(() => {
          setNotification(null)
        }, 5000);
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

  const blogsForm = () => (
    <div>
      <br></br>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  const createBlogRef = useRef()

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notification} state={notificationState}/>
      {!user && loginForm()}
      {user && <div>
          {userInfo()}
          <Togglable buttonLabel='new blog' ref={createBlogRef}>
            <CreateBlog 
              title={blogTitle}
              author={blogAuthor}
              url={blogUrl}
              handleTitleChange={({ target }) => setBlogTitle(target.value)}
              handleAuthorChange={({ target }) => setBlogAuthor(target.value)}
              handleUrlChange={({ target }) => setBlogUrl(target.value)}
              handleSubmit={handleCreateBlog}
            />
          </Togglable>
          {/* {createBlog()} */}
          {blogsForm()}
        </div>
      }
    </div>
  )
}

export default App