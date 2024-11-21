import React from 'react'
import Follow from './Follow'

function Follow_user_list() {
  return (
    <>
      
       <div id="follow_user_main">

       <h1 style={{textAlign : "center"}}>hyy this is followers of folling users list</h1>
       
       <div className='user_card_div'>

          <div className="user_card">
 
              <div>

                <img  src="https://gratisography.com/wp-content/uploads/2024/01/gratisography-cyber-kitty-800x525.jpg" alt="gg" />

                <p className='user_card_name'>name</p>

              </div>
              

              <div>
                     
                      <p>Skils - html , css , java etc ..</p>


                     {/* <p>Followers 5</p>  <p>Following -55</p> */}

                     
                       <span className='followers'>55 followers</span>
                       <span className='followers'>-55 following</span>


                   <div className='profile_icon'>

                        <a href=""><span>github <i class="fa-brands fa-github"></i></span></a>
  
                        <a href=""><span>linked <i class="fa-brands fa-linkedin-in"></i></span></a>


                       <a href=""><span>Mail <i class="fa-brands fa-google-plus-g"></i></span></a>

                    </div>
            
                        {/* <button>Fullow +</button> */}
                        <Follow my_id={"dvdvdssdbds"} />


                        
                        

                </div>


           </div>


          <div className="user_card">
 
              <div>

                <img  src="https://gratisography.com/wp-content/uploads/2024/01/gratisography-cyber-kitty-800x525.jpg" alt="gg" />

                <p className='user_card_name'>name</p>

              </div>
              

              <div>

                      <p>Skils - html , css , java etc ..</p>
                     <p>Followers 5</p>  <p>Following -55</p>

                   <div className='profile_icon'>

                        <a href=""><span>github <i class="fa-brands fa-github"></i></span></a>
  
                        <a href=""><span>linked <i class="fa-brands fa-linkedin-in"></i></span></a>


                       <a href=""><span>Mail <i class="fa-brands fa-google-plus-g"></i></span></a>

                    </div>
            
                        {/* <button>Fullow +</button> */}
                        <Follow my_id={"dvdvdssdbds"} />

                </div>


           </div>

          <div className="user_card">
 
              <div>

                <img  src="https://gratisography.com/wp-content/uploads/2024/01/gratisography-cyber-kitty-800x525.jpg" alt="gg" />

                <p className='user_card_name'>name</p>

              </div>
              

              <div>

                      <p>Skils - html , css , java etc ..</p>
                     <p>Followers 5</p>  <p>Following -55</p>

                   <div className='profile_icon'>

                        <a href=""><span>github <i class="fa-brands fa-github"></i></span></a>
  
                        <a href=""><span>linked <i class="fa-brands fa-linkedin-in"></i></span></a>


                       <a href=""><span>Mail <i class="fa-brands fa-google-plus-g"></i></span></a>

                    </div>
            
                        <button>Fullow +</button>

                </div>


           </div>


       </div>


       </div>
    
    </>
  )
}

export default Follow_user_list
