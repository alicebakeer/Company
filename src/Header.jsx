import React from 'react'
import img from './assets/logo.jpg'
import about from './About'
import contact from './Contact'
import login from './Login'
import './App.css'
import { useNavigate } from 'react-router-dom'
function Header() {
  const navigate = useNavigate()
  return (
    <>
      <div className='header' >
        <img src={img} alt="logo" className='logo'/>
        <nav className='navbar'>
            <ul className='nav-list'>
                  <li onClick={() => navigate('/')}>Home</li>
                  <li onClick={() => navigate('/about')}>About</li>
                  <li onClick={() => navigate('/contact')}>Contact</li>
                  <li onClick={() => navigate('/login')}>Login</li>
            </ul>
        </nav>
      </div>

            
    </>
  )
}

export default Header
