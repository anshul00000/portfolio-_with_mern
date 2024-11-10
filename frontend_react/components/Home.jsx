import React , { useContext, useEffect, useRef, useState }  from 'react'

import Button from '@mui/material/Button';
import Footer from './Footer';

import { Context } from '../public/context/context_api';

import { useSpring , animated } from 'react-spring';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';




function Home() {




    const { user ,backend_url } =  useContext(Context);

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
         const response = await fetch(`${backend_url}/login` , {
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
        

           function Number({n}){
            const { number } = useSpring({
              from : {number : 0 },
              number : n ,
              delay : 200 , 
              config : {mass : 1 , tension : 20 , friction : 10},
            });

            return <animated.div>{number.to((n)=>n.toFixed(0))}</animated.div> ;


           }





  return (
    <>




<h1 className="number_count">  <Number n={100}  />   </h1>

   <div className="landing_page">


<p className='_h1'>Your Portfolio,</p>







<div className='image_effect_div'>

<img className='img_1' src="public/idea.png" alt="icon" />
<p className='p_2'> Your Professional Story .</p>





</div>
   
<p className='l_p'>This Helps to Create to Your Project Playlist Just Create Your acount and Uplad Your Projects </p>


<div className="image_slider">

<img src="public/tasks.png" alt="ll" />
<img src="public/asas.png" alt="ll" />
<img src="public/innovation.png" alt="ll" />
<img src="public/staff-development.png" alt="ll" />
<img src="public/time-management.png" alt="ll" />

<img src="public/tasks.png" alt="ll" />
<img src="public/asas.png" alt="ll" />
<img src="public/innovation.png" alt="ll" />
<img src="public/staff-development.png" alt="ll" />
<img src="public/time-management.png" alt="ll" />


<img src="public/tasks.png" alt="ll" />
<img src="public/asas.png" alt="ll" />
<img src="public/innovation.png" alt="ll" />
<img src="public/staff-development.png" alt="ll" />
<img src="public/time-management.png" alt="ll" />
  


</div>



   </div>

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

      {/* <img src="boy-Photoroom.png" alt="" /> */}


      {/* <img src="letter-x.gif" alt="" /> */}

      <img src="2kKUUaoaDq1Umy9tokiuLWIMJDF.svg" alt="" />


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
      <div className='div1 '>
        <span className='animate'>
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
