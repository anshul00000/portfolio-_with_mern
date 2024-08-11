import React , { useContext, useState }  from 'react'

import Button from '@mui/material/Button';
import Footer from './Footer';

import { Context } from '../context/context_api';


function Home() {

    const { user } =  useContext(Context);

    const [L , L_C] = useState({email: "" , password: ""});
  
    const set_login=(e)=>{
  
      const {value , name } = e.target;
      
              L_C((p)=>{            
        return{              
              ...p,              
              [name] : value,
             }
            })
       };
  
  
  
        const login_save = async(e)=>{
         e.preventDefault()
        
        // all try and catch for fetch express url 
        
        try {
         const response = await fetch(`http://localhost:3000/login` , {
           method : "POST" ,     // this is default express url 
          
          headers : {
             "content-type" : "application/json",
             },
             body : JSON.stringify(L),
          
          })
          
           const data = await response.json();
  
           console.log(data);
  
  
          }catch (error) {
            console.log("register servar error with express URI " , error);
          }
          
  
         L_C({
            email : "",
             password:"",
           })
        
           }
        


  return (
    <>
    <div className='home_page_1'>
      <div>
      {/* <h1>hyy this is home page 🏠</h1> */}
      <p className='main_h1'>hyy this is home page</p>

     <h1 className='name_tag'>Welcome to react hyy i am {user ? (user.username) : "Anshul Chaurasiya"} </h1>
  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti aliquid quidem consectetur a? Voluptatem facilis tempore deleniti debitis temporibus dolorum minus blanditiis voluptatibus fuga sed praesentium quas quos, eveniet ut similique sunt!</p>
     <Button variant="contained">Contact Now</Button>
     <Button className='home_button' variant="outlined">Lern More</Button>

     </div>

     <div className='home_img'>

      <img src="boy-Photoroom.png" alt="" />

      {/* <img src="2kKUUaoaDq1Umy9tokiuLWIMJDF.svg" alt="" /> */}


      {/* <img src="../backend_express/public/images/default.jpg" alt="kk" /> */}

      {/* <img src="/users/default.jpg" alt="kk" /> */}

     </div>


{/* <form action='#' onSubmit={login_save}>

<input type="text" placeholder='email' name="email" value={L.email} onChange={set_login} /><br /><br />

<input type="password" placeholder='password' name="password" value={L.password} onChange={set_login}/><br /><br />

<button type="submit">Submit</button>
</form> */}
    </div>

    
    {/* <h1>this is social media link</h1> */}
   <div className="home_page_2">
      <div>
        <span>
        <h1>M -</h1>   
       <p>MongoDB</p>
        </span>
       </div>

      <div>
        <span>
        <h1>E -</h1>   
       <p>Express</p>
        </span>
       </div>

      <div>
        <span>
        <h1>R -</h1>   
       <p>React</p>
        </span>
       </div>

      <div>
        <span>
        <h1>N -</h1>   
       <p>Node</p>
        </span>
       </div>
      
      
   </div>
    <Footer/>
   </>
  )
}

export default Home
