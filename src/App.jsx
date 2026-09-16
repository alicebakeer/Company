import './App.css'
import Home from './Home'
import Login from './Login'
import About from './About'
import Contact from './Contact'
import Dashboard from './Dashboard'
import Content from './Content'
import SignUp from './SignUp'
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
<BrowserRouter basename="/Company">
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/about" element={<About />} />
     <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/contact" element={<Contact />} />
         <Route path="/signup" element={<SignUp />} />

        <Route path="/login" element={<Login />} />

        <Route path="/content" element={<Content />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App