import { useState } from "react"

const CreateBlog = ({
    handleNewBlog
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
                        value={blogTitle}
                        name="blogTitle"
                        onChange={event => setBlogTitle(event.target.value)}
                    />
                </div>
                <div>
                    author:
                    <input
                        type="text"
                        value={blogAuthor}
                        name="blogAuthor"
                        onChange={event => setBlogAuthor(event.target.value)}
                    />
                </div>
                <div>
                    URL:
                    <input
                        type="text"
                        value={blogUrl}
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