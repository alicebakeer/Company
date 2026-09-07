import React from 'react'
import Header from './Header'
import landing from './assets/landing_img.png'
import './App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
function Home() {
  return (
    <>
      <div>
            <Header/>
            <section className='hero'>
                <img src={landing} alt="Landing" className='landing-img' />
            </section>
<p className='home-text'>
  Our company website provides a wide range of digital solutions that can be
  used across many different fields and industries. Whether you are looking
  to build a personal project, start your own business, develop a professional
  website, or create a complete digital product, our platform helps transform
  your ideas into practical and innovative solutions. We combine modern
  technology, creative design, and reliable development to deliver solutions
  that meet your needs and support your goals.
</p>

      </div>
 
<div className='services'>
  <div className='service1'>
 <div className="service-icon">   <i
      className="fa-solid fa-list-check"
      style={{ color: "rgb(17, 14, 14)" }}
    ></i></div>
    <h3> <b>Build Your Project</b></h3>
    <p>Turn your ideas into a complete and functional project with modern technologies, clean design, and reliable development.</p>
 <a href="#contact">Learn More →</a>
  </div>

  <div className='service2'>
 <div className="service-icon">   <i
      className="fa-solid fa-industry"
      style={{ color: "rgb(17, 14, 14)" }}
    ></i></div>
    <h3><b>Build Your Own Business</b></h3>
    <p>Create a professional digital presence for your business with solutions designed to help you grow, reach customers, and achieve your goals.</p>
  <a href="#contact">Learn More →</a>
  </div>

  <div className='service3'>
 <div className="service-icon">   <i
      className="fa-solid fa-barcode"
      style={{ color: "rgb(17, 14, 14)" }}
    ></i></div>
    <h3><b>Build Your Product</b></h3>
    <p>Transform your product idea into a user-friendly and scalable solution with thoughtful design, powerful features, and modern technology.</p>
  <a href="#contact">Learn More →</a>
  </div>
</div>

<footer>
      © 2026 YourCompany. All Rights Reserved.
</footer>
    </>
  )
}

export default Home
