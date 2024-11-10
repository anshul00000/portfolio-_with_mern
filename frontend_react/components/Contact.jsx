import React , { useContext, useEffect, useState} from 'react'
import Button from '@mui/material/Button';
import Footer from './Footer';

import { Context } from '../public/context/context_api';

import {  toast } from 'react-toastify';


function Contact() {
  
 const { user , backend_url } =  useContext(Context);



  const [L , L_C] = useState({name: "" , email: "" , message : ""});
  

  // const [true_ , setrue_] = useState(true);

  // if(user && true_){

  //   L_C({name : user.username, email : user.email })

  //   setrue_(false);
  
  // }

  const [t , set_t] = useState(true) ;

  // useEffect(() => {

    // console.log("this is from outer side",t);

    // console.log("this is user term", user);

    if(t && user) {

      L_C({ name: user.username, email: user.email });

      set_t(false);

      // console.log("this is from inner side ",t);
    }

  // }, [user]);


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
       const response = await fetch(`${backend_url}/contact` , {
         method : "POST" ,     // this is default express url 
        
        headers : {
           "content-type" : "application/json",
           },
           body : JSON.stringify(L),
        
        })
        
         const data = await response.json();

         console.log(data);

         toast("sent sussefully ✔️");



        }catch (error) {
          console.log("register servar error with express URI " , error);
          toast.error("URL Error to insert data");
        }
        

       L_C((p)=>{
         return {
          ...p,
          message : "",
         }
         })
      
         }
      



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

<input type="text" placeholder='name' name="name" value={L.name} onChange={set_login} autoFocus /><br /><br />

<input type="email" placeholder='email' name="email" value={L.email} onChange={set_login}/><br /><br />


<textarea  cols={47} rows={10}  type="text"  name="message"  value={L.message} onChange={set_login} ></textarea>
<br />

<Button type="submit" className='home_button' variant="outlined">Submit</Button>

</form>
   </div>


  </div>
 <Footer />
 </>
  )
}

export default Contact
