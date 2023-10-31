import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState({type:'', text:''})

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      console.log(user)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
        console.log(error)
        setNotificationMessage({...notificationMessage, type: 'error', text:`wrong username or password`})
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
      <div>{user.name} is logged in</div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App