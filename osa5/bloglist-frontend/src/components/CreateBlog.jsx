const CreateBlog = ({
    handleSubmit,
    handleTitleChange,
    handleAuthorChange,
    handleUrlChange,
    title,
    author,
    url
}) => {
    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    title:
                    <input
                        type="text"
                        value={title}
                        name="blogTitle"
                        onChange={handleTitleChange}
                    />
                </div>
                <div>
                    author:
                    <input
                        type="text"
                        value={author}
                        name="blogAuthor"
                        onChange={handleAuthorChange}
                    />
                </div>
                <div>
                    URL:
                    <input
                        type="text"
                        value={url}
                        name="blogUrl"
                        onChange={handleUrlChange}
                    />
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default CreateBlog