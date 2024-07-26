import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import blogService from './services/blogs';
import loginService from './services/login';

import Blog from './components/Blog';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import CreateBlog from './components/CreateBlog';

import { setNotification } from './reducers/notificationReducer';
import { setNotificationStateError } from './reducers/notificationStateReducer';
import {
  initializeBlogs,
  newBlog,
  addVote,
  deleteBlog,
} from './reducers/blogsReducer';

const App = () => {
  const dispatch = useDispatch();

  const blogs = useSelector(({ blogs }) => {
    // Original blogs is immutable, therefore need to return
    // via toSorted()
    return blogs.toSorted();
  });

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const refreshBlogs = () => {
    // This is stupid, but works as a workaround for broken refresh
    // (also refreshing this way is kind of stupid)
    setTimeout(() => {
      dispatch(initializeBlogs());
    }, 10);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
      dispatch(setNotification(`Logged in as ${user.username}`, 5));
    } catch (exception) {
      dispatch(setNotificationStateError(5));
      dispatch(setNotification('Wrong username or password', 5));
    }
  };

  const handleLogout = (event) => {
    event.preventDefault();
    setUser(null);
    window.localStorage.removeItem('loggedBlogUser');
    dispatch(setNotification(`Logged out!`, 5));
  };

  const handleCreateBlog = (blogObject) => {
    createBlogRef.current.toggleVisibility();
    dispatch(newBlog(blogObject));
    dispatch(
      setNotification(`Successfully created blog '${blogObject.title}'`, 5),
    );
    refreshBlogs();
  };

  const handleAddLikes = (blogObject) => {
    dispatch(addVote(blogObject));
    dispatch(setNotification(`Blog deleted!`, 5));
    refreshBlogs();
  };

  const handleRemoveBlog = (blogObject) => {
    const confirm = window.confirm(
      `Remove blog ${blogObject.title} by ${blogObject.author}`,
    );
    if (confirm) {
      dispatch(deleteBlog(blogObject));
      dispatch(setNotification('Successfully removed blog', 5));
      refreshBlogs();
    }
  };

  const loginForm = () => (
    <div>
      <h2>login to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type='text'
            value={username}
            name='Username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type='password'
            value={password}
            name='Username'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  );

  const userInfo = () => (
    <div>
      {user.name} logged in
      <button onClick={handleLogout}>logout</button>
    </div>
  );

  const blogsForm = () => {
    console.log('BLOGS: ', blogs);
    const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);
    console.log('SB: ', sortedBlogs);
    return (
      <div>
        <br></br>
        {sortedBlogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            user={user}
            handleAddLikes={handleAddLikes}
            handleRemoveBlog={handleRemoveBlog}
          />
        ))}
      </div>
    );
  };

  const createBlogRef = useRef();

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      {!user && loginForm()}
      {user && (
        <div>
          {userInfo()}
          <Togglable buttonLabel='new blog' ref={createBlogRef}>
            <CreateBlog handleNewBlog={handleCreateBlog} />
          </Togglable>
          {blogsForm()}
        </div>
      )}
    </div>
  );
};

export default App;
