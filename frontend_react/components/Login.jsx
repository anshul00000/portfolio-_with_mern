import React , {useContext, useState} from 'react'
import Button from '@mui/material/Button';
import Footer from './Footer';
import { Context } from '../context/context_api';
import { useNavigate } from 'react-router-dom';


import {  toast } from 'react-toastify';



function Login() {
  
  const a =  useContext(Context);

  const navitate = useNavigate();

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
      
      //  toast("Login saved WORKING");

      // all try and catch for fetch express url 
      
      try {
       const response = await fetch(`http://localhost:3000/login` , {
         method : "POST" ,     // this is default express url 
        
        headers : {
           "content-type" : "application/json",
           },
           body : JSON.stringify(L),
        
        })
        
        // toast("TRY KIYA");
        
        const data = await response.json();
        //  console.log(response);

        // toast("res aaya ");

        //  console.log(data);

          if(data.tooken){
            
            a.save_tooken(data.tooken);
            L_C({
              email : "",
              password:"",
            })
            toast("success login ✔️");
            
            navitate("/");

          }else{
            // console.log(data);
        //  console.log(data.message);

        toast(data.message);
        toast(data.msg);

        // toast.error(data.msg , {
        //   position: "top-right",
        //   autoClose: 5000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        //   theme: "light",
        //   // transition: Bounce,
        //   });


          }

        }catch (error) {
          console.log("register servar error with express URI " , error);
        }
        

      
         }
      

         //save token using Context



  return (
    <>
   
   <div className='home_page_1'>
    <div>
    {/* <h1>hyy this is home page 🏠</h1> */}
    <p className='main_h1'>hyy this is Contact page for contact me </p>

   <h1  className='name_tag'> i am Anshul Chaurasiya </h1>
<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti aliquid quidem consectetur a? Voluptatem facilis tempore deleniti debitis temporibus dolorum minus blanditiis voluptatibus fuga sed praesentium quas quos, eveniet ut similique sunt!</p>
   <Button variant="contained">Contact Now</Button>
   <Button className='home_button' variant="outlined">Lern More</Button>

   </div>

   <div className='contact_form_div'>
    {/* <img src="boy-Photoroom.png" alt="" /> */}
    <form action='#' onSubmit={login_save}>

<input type="text" placeholder='email' name="email" value={L.email} onChange={set_login} autoFocus/><br /><br />

<input type="password" placeholder='password' name="password" value={L.password} onChange={set_login}/><br /><br />

<br />
{/* <button type="submit">Login</button> */}
<Button type='submit' variant="contained">Login</Button>
</form>
   </div>

 

  </div>
<Footer/>

    </>
  )
}

export default Login ;
