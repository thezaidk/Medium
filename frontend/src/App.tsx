import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { Blog } from './pages/Blog'
import { Blogs } from './pages/Blogs'
import { ThemeProvider } from './components/theme-provider'
import { Publish } from './pages/Publish'
import { Update } from './pages/Update'

function App() {

  return (
    <>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/blog/:id" element={<Blog />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/user/blogs" element={<Blogs />} />
            <Route path="/publish" element={<Publish />} />
            <Route path="/update/:id" element={<Update />} />
            <Route path="*" element={<Signin />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  )
}

export default App
