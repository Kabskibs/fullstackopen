import { useState } from "react"

const CreateBlog = ({
    handleNewBlog,
    title,
    author,
    url
}) => {
    
    const [blogTitle, setBlogTitle] = useState('')
    const [blogAuthor, setBlogAuthor] = useState('')
    const [blogUrl, setBlogUrl] = useState('')

    const resetNewBlog = () => {
        setBlogTitle('')
        setBlogAuthor('')
        setBlogUrl('')
    }

    const createNewBlog = (event) => {
        event.preventDefault()
        handleNewBlog({
            title: blogTitle,
            author: blogAuthor,
            url: blogUrl
        })
        resetNewBlog()
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={createNewBlog}>
                <div>
                    title:
                    <input
                        type="text"
                        value={title}
                        name="blogTitle"
                        onChange={event => setBlogTitle(event.target.value)}
                    />
                </div>
                <div>
                    author:
                    <input
                        type="text"
                        value={author}
                        name="blogAuthor"
                        onChange={event => setBlogAuthor(event.target.value)}
                    />
                </div>
                <div>
                    URL:
                    <input
                        type="text"
                        value={url}
                        name="blogUrl"
                        onChange={event => setBlogUrl(event.target.value)}
                    />
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default CreateBlog