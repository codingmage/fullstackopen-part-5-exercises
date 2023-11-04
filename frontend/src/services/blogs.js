import axios from "axios"
const baseUrl = "/api/blogs"

let token = null

const setToken = newToken => {
	token = `Bearer ${newToken}`
}

const getAll = () => {
	const request = axios.get(baseUrl)
	return request.then(response => response.data)
}

const createBlog = async newBlog => {
	const config = {
		headers: { Authorization: token },
	}

	const request = await axios.post(baseUrl, newBlog, config)
	return request.data
}

const updateBlog = async (id, blogWithLikes) => {
	console.log(id)
	console.log(blogWithLikes)
	const request = await axios.put(`${baseUrl}/${id}`, blogWithLikes)
	await request.data 
}

export default { getAll, createBlog, setToken, updateBlog }