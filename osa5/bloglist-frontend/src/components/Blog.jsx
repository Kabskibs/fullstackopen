import { useState } from "react"

const Blog = ({ blog, handleAddLikes }) => {
  const [collapsed, setCollapse] = useState(true)

  const addLikes = (event) => {
    event.preventDefault()
    handleAddLikes({
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      id: blog.id
    })
  }

  return (
    <div className="blogPostBox">
      {collapsed ? (
        <>
          <>{blog.title} {blog.author}</>
          <button onClick={ () => setCollapse(!collapsed) }>view</button>
        </>
      ) : (
        <>
          <>{blog.title} {blog.author}
            <button onClick={ () => setCollapse(!collapsed) }>hide</button><br></br>
          </>
          {blog.url}<br></br>
          <>likes {blog.likes} <button onClick={addLikes}>like</button><br></br></>
          {blog.user.name}
        </>
      )}
    </div>
  )
}

export default Blog