
import img from './assets/logo.jpg'

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
                  <li onClick={() => navigate('/login')}>Login</li>
                   <li onClick={() => navigate('/signup')}>Signup</li>
                  
            </ul>
        </nav>
      </div>

            
    </>
  )
}

export default Header
