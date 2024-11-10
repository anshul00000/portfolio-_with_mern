import React , {useContext, useRef, useState} from 'react'
import Button from '@mui/material/Button';
import Footer from './Footer';


import { Context } from '../public/context/context_api';
import { useNavigate } from 'react-router-dom';


import {  toast } from 'react-toastify';

// const api = import.meta.env.backend_url ;


function Login() {
  
  const [dialog , set_dialog] = useState(false) ; 

  const [on_password , set_on_password] = useState(false) ;

 
  const [forget_p , set_forget_p ]=  useState({
    email : "",
    password : "",
  });

  const dialogRef = useRef(null);


  const openDialog = () => {
    if (dialogRef.current) {
  
      // set_project_details({
      //   id : id,
      //   name: n,
      //   description: d,
      //   technologys: t,
      // })

       dialogRef.current.showModal();
      set_dialog(true);
    }
  };
  


  const closeDialog = () => {
  
    if (dialogRef.current) {

      // set_project_details({
      //   id : "",
      //   name: "", 
      //   description: "",
      //   technologys: "",
      //   file: null,
      // })


      dialogRef.current.close();
      set_dialog(false);
    }
  };
  


  const forget_p_value =(e)=>{

    const {name , value } = e.target ; 
  
    set_forget_p((p)=>{
      return{
       ...p,
        [name] : value,
      }
    });
  
  
   }
  
  const forget_password=async(e)=>{
    e.preventDefault()

if(forget_p.password === ""){
  // forget_p.email 



  try {
    const response = await fetch(`${backend_url}/forget` , {
      method : "POST" ,     // this is default express url 
     
     headers : {
        "content-type" : "application/json",
        },
        body : JSON.stringify(forget_p),
     
     })
     
     // toast("TRY KIYA");
     
     const data = await response.json();
   

      // alert(data);
      console.log(data);

      if(data){
        set_on_password(!on_password);
      }else{
        alert("email not found please create account ");
      }


     }catch (error) {
     toast("url error");
   console.log("register servar error with express URI " , error);
     }


    }else{


      
  try {
    const response = await fetch(`${backend_url}/forget` , {
      method : "POST" ,     // this is default express url 
     
     headers : {
        "content-type" : "application/json",
        },
        body : JSON.stringify(forget_p),
     
     })
     
     // toast("TRY KIYA");
     
     const data = await response.json();
   

      // alert(data);
      console.log(data);

      if(data){
        alert("your password is changed");
        set_on_password(!on_password);
      }else{
        alert("somthing went wrong in backend to change password");
      }


     }catch (error) {
     toast("url error");
   console.log("register servar error with express URI " , error);
     }


    }






  }


  const {save_tooken , backend_url} =  useContext(Context);

  const navitate = useNavigate();

  const [L , L_C] = useState({email: "" , password: ""});
  



      // console.log(backend_url);


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


      // const url = "https://portfolio-with-mern-backend.onrender.com";
      
      
      
      try {
       const response = await fetch(`${backend_url}/login` , {
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
            
            // a.save_tooken(data.tooken);
            save_tooken(data.tooken);
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
        toast("url error");
      console.log("register servar error with express URI " , error);
        }
        

      
         }
      

         //save token using Context



  return (
    <>
   

   <dialog ref={dialogRef}>
        {/* <p>This is a dialog</p>
        <button onClick={closeDialog}>Close</button> */}

        <div className='div'>

          <div className='update_project_div'>

     
          <form onSubmit={forget_password}>


<input className='email_froget' style={{display: on_password ? 'none' : 'block',}} onChange={forget_p_value} name="email" value={forget_p.email} type="email" placeholder='email'/>

<input style={{display: on_password ? 'block' : 'none',}} name="password" value={forget_p.password} onChange={forget_p_value} type="text" placeholder='password'/>

<button type='sumbit'>Submut</button>

</form>


          </div>


        </div>


        <button className='clode_dilog_btn' onClick={closeDialog}>Close</button>


      </dialog>



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


<p onClick={()=>openDialog()} style={{color:"red"}}>forget your password </p>





<Button type='submit' variant="contained">Login</Button>
</form>
   </div>

 

  </div>
<Footer/>

    </>
  )
}

export default Login ;
