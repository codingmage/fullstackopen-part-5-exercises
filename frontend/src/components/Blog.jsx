import { useState } from "react"

const Blog = ({ blog, updateBlog, deleteBlog, currentUserName }) => {

	const [visible, setVisible] = useState(false)
	const [buttonContent, setButtonContent] = useState("view")
	const [newLikes, setNewLikes] = useState(blog.likes)

	const handleVisibility = () => {
		setVisible(!visible)
		if(buttonContent === "view") {
			setButtonContent("hide")
		} else {
			setButtonContent("view")
		}
		
	}

	const handleLiking = (event) => {
		event.preventDefault()

		const likesPlusOne = newLikes + 1

		const updatedBlog = {
			title: blog.title,
			author: blog.author,
			url: blog.url, 
			likes: likesPlusOne, 
			user: blog.user.id}

		updateBlog(blog.id, updatedBlog)

		setNewLikes(likesPlusOne)
	
	}

	const handleDelete = (event) => {
		event.preventDefault()
		deleteBlog(blog.id, blog.title)

	}


	const showWhenVisible = { display: visible ? "" : "none" }

	const sameUser = currentUserName === blog.user.username

	return (
		<div className="blogStyle">
			<span>
				{blog.title} - {blog.author} 
				<button className="smallButton" onClick={handleVisibility}>{buttonContent}</button>
			</span>
			<div style={showWhenVisible}>
				<div>{blog.url}</div>
				<div>{newLikes} <button onClick={handleLiking}>like</button></div>
				<div>{blog.user.name}</div>
				{sameUser ? <button onClick={handleDelete}>remove</button> : ""}
			</div>

		</div>  
	)

}

export default Blog