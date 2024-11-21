import React , { useContext, useEffect, useState} from 'react'

import { Context } from '../public/context/context_api';

import {  toast } from 'react-toastify';


function Contact() {
    
  const [button , setbutton] = useState(true) ; 

     
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

     setbutton(!button);

     
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

     setbutton(true);

        toast("sent sussefully ✔️");



       }catch (error) {
             setbutton(true);

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


        <div className="main_login_div">

            <div className="form">

                <h2 className='fontstyle'>| CONTACT |</h2>


                <form action='#' onSubmit={login_save}>

<input type="text" placeholder='name' name="name" value={L.name} onChange={set_login} autoFocus /><br /><br />

<input type="email" placeholder='email' name="email" value={L.email} onChange={set_login}/><br /><br />


<textarea placeholder='Enter hear'  cols={47} rows={10}  type="text"  name="message"  value={L.message} onChange={set_login} ></textarea>
<br />

{/* <Button type="submit" className='home_button' variant="outlined">Submit</Button> */}

    <button className='submit_login' type='submit' variant="contained">{button ? "SEND" : "Sending ........"}</button>
</form>






            </div>



            <div className="circle"></div>
            <div className="circle-1"></div>
            <div className="circle-2"></div>

        </div>





    )
}

export default Contact
