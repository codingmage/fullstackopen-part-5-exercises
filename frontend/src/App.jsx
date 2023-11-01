import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState({type:'', text:''})
  const [blogName, setBlogName] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogURL, setBlogURL] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const userIsLoggedInJSON = window.localStorage.getItem('loggedInUser')
    if (userIsLoggedInJSON) {
      const user = JSON.parse(userIsLoggedInJSON)
      setUser(user)
      blogService.setToken(user.token)    
    }
  }, [])

  const userLogOut = () => {
    /* window.localStorage.removeItem('loggedInUser') */
    window.localStorage.clear()
    setUser(null)
    window.location.reload()
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
/*       console.log(user) */
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      window.localStorage.setItem('loggedInUser', JSON.stringify(user)) 
    } catch (error) {
        console.log(error)
        setNotificationMessage({...notificationMessage, type: 'error', text:`wrong username or password`})
        setTimeout(() => {
          setNotificationMessage('')
        }, 5000)
    }
  }
  
  const handleNewBlog = async (event) => {

    event.preventDefault()

    const newBlog = {
      title: blogName,
      author: blogAuthor,
      url: blogURL
    }

    try {
      const responseBlog = await blogService.createBlog(newBlog)
      setBlogs([...blogs, responseBlog])
      setBlogName('')
      setBlogAuthor('')
      setBlogURL('')
      setNotificationMessage({...notificationMessage, type: 'info', text:`new blog ${responseBlog.title} added`})
      setTimeout(() => {
        setNotificationMessage('')
      }, 5000)
      
    } catch (error) {
      setNotificationMessage({...notificationMessage, type: 'error', text:`could not add blog`})
      setTimeout(() => {
        setNotificationMessage('')
      }, 5000)
    }

  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>

        <Notification message={notificationMessage.text} type={notificationMessage.type} />

        <form onSubmit={handleLogin}>
          <div>
            <span>
              username
              <input 
                type='text'
                value={username}
                name='Username'
                onChange={({target}) => setUsername(target.value)}
              />
            </span>
          </div>
          <div>
            <span>
              password
              <input 
                type='password'
                value={password}
                name='Password'
                onChange={({target}) => setPassword(target.value)}
              />
            </span>
          </div>
          <button type='submit'>login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>

      <Notification message={notificationMessage.text} type={notificationMessage.type} />

      <div>
        {user.name} is logged in
        <button type='button' onClick={userLogOut}>logout</button>
      </div>
      <br />
      <div>
        <h2>Add a new blog</h2>

        <form onSubmit={handleNewBlog}>
          <p>title: <input type="text" name='Title' value={blogName} onChange={({target}) => setBlogName(target.value)} /></p>
          <p>author: <input type="text" name='Author' value={blogAuthor} onChange={({target}) => setBlogAuthor(target.value)} /></p>
          <p>url: <input type="text" name='URL' value={blogURL} onChange={({target}) => setBlogURL(target.value)} /></p>
          <button type='submit' >Add</button>

        </form>
      </div>
      <br />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App