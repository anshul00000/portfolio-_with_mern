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

      <a href="" target="_blank" className="link"><img src="https://assets.codepen.io/9051928/codepen_1.png" alt="" /></a>

      <a href="" target="_blank" className="link"><img src="https://assets.codepen.io/9051928/x.png" alt="" /></a>

      <a href="" target="_blank" className="link"><img src="https://assets.codepen.io/9051928/youtube_1.png" alt="" /></a>
    
   

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
