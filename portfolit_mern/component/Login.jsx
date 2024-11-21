import React, { useContext, useEffect, useState, useRef } from 'react'


import {NavLink , Link} from "react-router-dom";


import { Context } from '../public/context/context_api';


import { useNavigate } from 'react-router-dom';


import { ToastContainer, toast } from 'react-toastify';



function Login() {

  

  const [button, setbutton] = useState(true);
  const [button2, setbutton2] = useState(true);
  const [button3, setbutton3] = useState(true);
  const [resend, set_resend] = useState(false);



  const [isOpen, setIsOpen] = useState(false);

  const [isotp, setisotp] = useState(false);

  

  const [otp, set_otp] = useState();


  
  // const [dialog , set_dialog] = useState(false) ; 

  const [on_password , set_on_password] = useState(false) ;

 
  const [forget_p , set_forget_p ]=  useState({
    email : "",
    password : "",
  });

  const dialogRef = useRef(null);


  const change_mail=(e)=>{
    e.preventDefault();

    set_on_password(false); // Ensure on_password(false) is correctly updating
    setisotp(false); // This should also work if setisotp is a state updater function
  

    alert("change email id ");
  }



  // run 5 minit timeout

  const [timeLeft, setTimeLeft] = useState(5 * 60); // 5 minutes in seconds
  const [isActive, setIsActive] = useState(false);


  const startCountdown = () => {
    setIsActive(true);
    setTimeLeft(5 * 60); // Reset to 5 minutes each time button is clicked
  };

  // Convert seconds to MM:SS format
  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };


  // run 5 minit timeout


  const openDialog = () => {
    if (dialogRef.current) {
  
      // set_project_details({
      //   id : id,
      //   name: n,
      //   description: d,  `96
    
      //   technologys: t,
      // })

       dialogRef.current.showModal();

    setIsOpen(true);

        // set_dialog(true);
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

    setIsOpen(false);

      // set_dialog(false);
    }
  };
  


  const forget_p_value =(e)=>{

    e.preventDefault()
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

    
        setisotp(false); // This should also work if setisotp is a state updater function
      
        set_forget_p("");
    

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
    e.preventDefault()
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
        setbutton(true);


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
        setbutton(true);

        toast("url error");
      console.log("register servar error with express URI " , error);
        }
        

      
      }
      

         //send otp and verify function 

         const set_otp_ =(e)=>{
          e.preventDefault()
          const {value , name } = e.target;
       
          set_otp(value);
       
        }
       
         
  const send_otp = async (e) => {

    e.preventDefault()

    // setbutton(false);


    if (forget_p.email == "" ) {
      toast("Email is required !");

      // setbutton(true);
      return;
    }

    const email = forget_p.email;

    console.log("this is email = " + email);


    const send_data = {
      email : forget_p.email ,
      forget : true ,
    }


    try {
      const response = await fetch(`${backend_url}/sendotp`, {
        method: "POST",     // this is default express url 
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(send_data),

      });
      const data = await response.json();

      console.log(data);

      //  if(data.message){
      if (data.status == 200) {

        toast(data.message);

        setisotp(true)

        startCountdown();

        // setIsOpen_diglog(true);

        // setbutton(true);

        // set_resend(true);

        // const [isOpen_diglog, setIsOpen_diglog] = useState(false);


        // openDialog();
        // alert(data.message);
        console.log(data.message);


      } else if (data.status === 400) {


        toast(data.message);
        // setbutton(true);
        alert(data.message);


        

      } else if (data.status === 500) {

        toast(data.message);
        // setbutton(true);


      } else {
        toast("response not found");
        alert("response not found");
        console.log("response not found");
        // setbutton(true);

      }



    } catch (error) {


      // alert("Registration failed");
      // error ?  setbutton(!button) : alert("Registration failed") ;

      // setbutton(!button);

      // alert("error form send otp to catch");
      // setbutton(true);
      toast.error("error form send otp to catch");
      console.log("dend-otp servar error with express URI ", error);
    }


  }



  const verify_otp = async (e) => {

    e.preventDefault()

    // setbutton2(false);


    if (otp == "") {
      toast("otp is requre");
      console.log("otp is requre");
      // setbutton2(true);
      return;
    }

    // const otp = L.otp ;

    const details = {
      email: forget_p.email,
      otp : otp 
    }

    console.log( details);



    try {
      const response = await fetch(`${backend_url}/verifyotp`, {
        method: "POST",     // this is default express url 
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(details),

      });
      const data = await response.json();

      //  console.log(data);

      //  if(data.message){
      if (data.status == 200) {

        toast(data.message);


        // on_password(true);
        set_on_password(true)
        // login_save();
        // setbutton2(true);
        // set_resend(false);

        // const [input_email, set_input_email] = useState(false);


        // setIsActive(false);
        // setIsOpen_diglog(false);

        // closeDialog();

        // setIsOpen_diglog(false);

        // set_input_email(true);


        // alert(data.message);
        console.log(data.message);


      } else if (data.status == 400) {


        toast(data.message);
        // setbutton2(true);

      } else {
        toast("response not found");
        alert("response not found");
        console.log("response not found");
        // setbutton2(true);
      }



    } catch (error) {


      // alert("Registration failed");
      // error ?  setbutton(!button) : alert("Registration failed") ;

      // setbutton(!button);

      // alert("error form send otp to catch");
      // setbutton2(true);
      toast.error("error form send otp to catch");
      console.log("dend-otp servar error with express URI ", error);
    }







  }


  
  useEffect(() => {
    // Handle scroll behavior when the dialog is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto'; // or 'scroll'
    }
  
    // Timer setup
    let timer;

    if (isActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {

      
      set_on_password(false); // Ensure on_password(false) is correctly updating
      setisotp(false); // This should also work if setisotp is a state updater function
  
      setIsActive(false);
      
      // closeDialog();



      toast("time is up ");
    }
  
    // Cleanup function to reset overflow and clear timer on component unmount
    return () => {
      document.body.style.overflow = 'auto';
      clearInterval(timer);
    };
  }, [isOpen, isActive, timeLeft]); // Dependencies for both scroll control and timer
  


  return (
    <>
    

    <dialog ref={dialogRef}>
        {/* <p>This is a dialog</p>
        <button onClick={closeDialog}>Close</button> */}


        <div className='div'>

          <div className='update_project_div'>

     
          {/* <form onSubmit={forget_password}> */}

          <form onSubmit={on_password ? forget_password : isotp ? verify_otp : send_otp }>

         
{
on_password ?<> <h1 style={{textAlign : "center"}}>Enter New password  </h1> <p style={{textAlign : "center"}}>{forget_p.email}</p></>: (
  isotp ?<> <h1 style={{textAlign : "center"}}>Enter otp which send  </h1> <p style={{textAlign : "center"}}>{forget_p.email}</p></>: <h1 style={{textAlign : "center"}}>Enter your Email </h1>
)


}


{
on_password ? null : (
  isotp ? null :  <input className='email_froget' style={{display: on_password ? 'none' : 'block',}} onChange={forget_p_value} name="email" value={forget_p.email} type="email" placeholder='email'/>
)

}



{

on_password ? null : (
  isotp ? (<>
    <input style={{ height: "10vh", width: "100%", border: "1px solid black", fontSize: "1.5rem", placeholder: "red" }} type="number" placeholder='...' name="otp" value={otp} onChange={set_otp_} autoFocus />
     <h2>OTP expired after: {formatTime()}</h2>
     </>
  ) : null 

)

}


{

  on_password ?<input  name="password" value={forget_p.password} onChange={forget_p_value} type="text" placeholder='password'/> : null

}

{/* <h2>OTP expired after: {formatTime()}</h2> */}

{/* <input style={{display: on_password ? 'block' : 'none',}} name="password" value={forget_p.password} onChange={forget_p_value} type="text" placeholder='password'/> */}

<button type='sumbit'>Submut</button>

{
  on_password ? <button style={{background :"brown"}} onClick={change_mail}>change Gmail id</button> : (
    isotp? <> <button style={{background :"skyblue" , color : "black"}} onClick={send_otp}>Resend OTP</button> <button style={{background :"brown"}} onClick={change_mail}>change Gmail id</button></> :null
  )
}






{/* <ToastContainer className="toast_div" position="top-center" /> */}


</form>


          </div>


        </div>


        <button className='clode_dilog_btn' onClick={closeDialog}>Close</button>


      </dialog>


     
      {/* <ToastContainer className="toast_div" position="top-center" /> */}

      <ToastContainer className="toast_div" position="top-center" />

    
<div className="main_login_div">

<div className="form">
  
    <h2 className='fontstyle'>| LOGIN |</h2>

    <form action='#' onSubmit={login_save}>
  
    <input type="text" placeholder='email' name="email" value={L.email} onChange={set_login} autoFocus />


    <input  type="password" placeholder='password' name="password" value={L.password} onChange={set_login} />

    {/* <a className='submit_login' href="_" type="">Sign in</a> */}

    {/* <Button className='submit_login' type='submit' variant="contained">Login</Button> */}

<button className='submit_login' type='submit' variant="contained">{button ? "Login" : "Sending ........"}</button>
<br /><br />
    
<NavLink to="/signup"><i className="fa-solid fa-user-plus text-black"></i>SIGNUP</NavLink>

    <br /><br />

    <p onClick={()=>openDialog()} style={{color:"red"}}>forget your password </p>
    
    <div className="socials">
   {/* <img src="https://i.pinimg.com/originals/b3/da/ac/b3daac6815ebf1516a545db6c3e40a36.jpg" alt="kk" />
   <img src="https://icones.pro/wp-content/uploads/2021/02/facebook-icone-orange.png" alt="kk" />    
   <img src="https://i.pinimg.com/originals/ac/cf/1d/accf1d80314304e11e2bcf9537e13304.jpg" alt="kk" />
     */}
</div>

</form>

</div>

<div className="circle"></div>
<div className="circle-1"></div>
<div className="circle-2"></div>

       </div> 
     
   
    </>
  )
}

export default Login
