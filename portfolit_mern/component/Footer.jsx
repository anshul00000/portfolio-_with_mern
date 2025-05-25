import React from 'react'

function Footer() {
    return (
        <>
 <div className='footer_div'>
 <div className="card">
  <h2 className='font'>Thank YOU  </h2>
  <button>^_^</button>
</div>
<footer id="footer">

<div className="col col1">

    <h3 className='font'>skillfolio</h3>

    <p>Made <span style={{color : "#BA6573"}}>❤</span> by Anshul</p>

    <div className="social">
      <a href="https://anshul00.netlify.app/" target="_blank" className="link"><img style={{width :"70%", height:"70%"}} src="https://cdn-icons-png.flaticon.com/512/1096/1096121.png" alt="" /></a>
      <a href="https://www.linkedin.com/in/anshul-chaurasiya-82243a25b/" target="_blank" className="link"><img style={{width :"70%", height:"70%"}} src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png" alt="" /></a>
      <a href="https://github.com/anshul00000" target="_blank" className="link"><img style={{width :"70%", height:"70%"}} src="https://cdn.iconscout.com/icon/free/png-256/free-github-logo-icon-download-in-svg-png-gif-file-formats--70-flat-social-icons-color-pack-logos-432516.png?f=webp&w=256" alt="" /></a>
      <a href="https://www.instagram.com/anshul._00/" target="_blank" className="link"><img style={{width :"70%", height:"70%"}} src="https://cdn2.iconfinder.com/data/icons/2018-social-media-app-logos/1000/2018_social_media_popular_app_logo_instagram-512.png" alt="" /></a>
    </div>
    {/* style="color: #818181; font-size: smaller" */}
    <p style={{color: "#818181", fontSize:" smaller"}} >2024 © All Rights Reserved</p>
  </div>
  <div className="col col2">
    {/* <p>About</p>
    <p>Our mission</p>
    <p>Privacy Policy</p>
    <p>Terms of service</p> */}
  </div>
  <div className="col col3">
    {/* <p>Services</p>
    <p>Products</p>
    <p>Join our team</p>
    <p>Partner with us</p> */}
  </div>


  <div className="backdrop"></div>





</footer>



</div>

        </>
    )
}

export default Footer
