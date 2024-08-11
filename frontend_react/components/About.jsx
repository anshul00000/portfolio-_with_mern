import React from 'react'
import Button from '@mui/material/Button';
import Footer from './Footer';


function About() {
  return (
    <>
    <div className='home_page_1'>
      <div>
      {/* <h1>hyy this is home page 🏠</h1> */}
      <p className='main_h1'>hyy this is About me </p>

     <h1 className='name_tag'>i am Anshul Chaurasiya</h1>
  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti aliquid quidem consectetur a? Voluptatem facilis tempore deleniti debitis temporibus dolorum minus blanditiis voluptatibus fuga sed praesentium quas quos, eveniet ut similique sunt!</p>
     <Button variant="contained">Contact Now</Button>
     <Button className='home_button' variant="outlined">Lern More</Button>

     </div>

     <div className='home_img'>
      <img src="view-3d-businessman-Photoroom.png" alt="" />
     </div>

    </div>
    <Footer />
    </>
  )
}

export default About
