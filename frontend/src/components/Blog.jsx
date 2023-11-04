import { useState } from "react"

const Blog = ({ blog }) => {

	const [visible, setVisible] = useState(false)
	const [buttonContent, setButtonContent] = useState("view")

	const handleVisibility = () => {
		setVisible(!visible)
		if(buttonContent === "view") {
			setButtonContent("hide")
		} else {
			setButtonContent("view")
		}
		
	}

	const showWhenVisible = { display: visible ? "" : "none" }

	return (
		<div className="blogStyle">
			<span>
				{blog.title} - {blog.author} 
				<button className="smallButton" onClick={handleVisibility}>{buttonContent}</button>
			</span>
			<div style={showWhenVisible}>
				<div>{blog.url}</div>
				<div>{blog.likes} <button>like</button></div>
				<div>{blog.user.name}</div>
			</div>

		</div>  
	)

}

export default Blog