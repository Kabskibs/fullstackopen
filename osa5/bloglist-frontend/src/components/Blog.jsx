import { useState } from "react"

const Blog = ({ blog }) => {
  const [collapsed, setCollapse] = useState(true)
  return (
    <div className="blogPostBox">
      {collapsed ? (
        <>
          {blog.title}
          <button onClick={ () => setCollapse(false) }>view</button>
        </>
      ) : (
        <>
          {blog.title}
          <button onClick={ () => setCollapse(true) }>hide</button><br></br>
          {blog.url}<br></br>
          likes {blog.likes}
          <button>like</button><br></br>
          {blog.author}
        </>
      )}
    </div>
  )
}

export default Blog