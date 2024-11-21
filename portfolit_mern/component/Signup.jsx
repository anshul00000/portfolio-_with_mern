import React, { useContext, useEffect, useState, useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify';

import { NavLink, Link, useNavigate } from "react-router-dom";

import { Context } from '../public/context/context_api';

// import { toast } from 'react-toastify';



function Signup() {
  
  const [button, setbutton] = useState(true);
  const [button2, setbutton2] = useState(true);
  const [resend, set_resend] = useState(false);

  const a = useContext(Context);
  const { backend_url } = useContext(Context);


  const navitate = useNavigate();


  const [isOpen, setIsOpen] = useState(false);

  const [isOpen_diglog, setIsOpen_diglog] = useState(false);

  const [input_email, set_input_email] = useState(false);

  const [otp, set_otp] = useState();

  const dialogRef = useRef(null);


  const [L, L_C] = useState({ username: "", email: "", password: "", phone: ""  });


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



  const set_login = (e) => {

    const { value, name } = e.target;
    
    L_C((p) => {
      return {
        ...p,
        [name]: value,
      }
    })
  };
  
  
  const set_otp_ =(e)=>{
   const {value , name } = e.target;

   set_otp(value);

 }


 const openDialog = () => {

  // alert("its working ");
  // e.preventDefault()

  if (dialogRef.current) {


    dialogRef.current.showModal();
    setIsOpen(true);
    //  set_dialog(true);
  }



};


const closeDialog = () => {

  if (dialogRef.current) {

    dialogRef.current.close();
    setIsOpen(false);
    // set_dialog(false);
  }
};






  const login_save = async (e) => {
    e.preventDefault()

    setbutton(!button);

    // all try and catch for fetch express url 

    try {
      const response = await fetch(`${backend_url}`, {
        method: "POST",     // this is default express url 

        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(L),

      })
      const data = await response.json();

      if (data.tooken) {


        console.log(data.tooken);

        L_C({ username: "", email: "", password: "", phone: "" })
        a.save_tooken(data.tooken);

        setbutton(!button);


        toast("Registration successful");


        navitate("/");



      } else {
        // alert("Registration failed from response");
        toast(data.message);
        toast(data.msg);
        // setbutton(!button);

        setbutton(true);


        //  setbutton(!button);


        console.log(data);

      }

    } catch (error) {


      // alert("Registration failed");
      // error ?  setbutton(!button) : alert("Registration failed") ;

      // setbutton(!button);

      setbutton(true);

      toast.error("Registration failed  from cache");

      // alert("Registration failed from cache");

      console.log("register servar error with express URI ", error);
    }



  }





  const send_otp = async (e) => {

    e.preventDefault()

    setbutton(false);


    if (L.username == "" || L.email == "" || L.password == "" || L.phone == "") {
      toast("All fields are required");
      setbutton(true);

      return;
    }

    const email = L.email;

    console.log("this is email = " + email);

    try {
      const response = await fetch(`${backend_url}/sendotp`, {
        method: "POST",     // this is default express url 
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ email }),

      });
      const data = await response.json();

      console.log(data);

      //  if(data.message){
      if (data.status == 200) {

        toast(data.message);

        startCountdown();

        setIsOpen_diglog(true);

        setbutton(true);

        set_resend(true);

        

        // const [isOpen_diglog, setIsOpen_diglog] = useState(false);


        openDialog();
        // alert(data.message);
        console.log(data.message);


      } else if (data.status === 400) {


        toast(data.message);
        setbutton(true);


        

      } else if (data.status === 500) {

        toast(data.message);
        setbutton(true);


      } else {
        toast("response not found");
        alert("response not found");
        console.log("response not found");
        setbutton(true);

      }



    } catch (error) {


      // alert("Registration failed");
      // error ?  setbutton(!button) : alert("Registration failed") ;

      // setbutton(!button);

      // alert("error form send otp to catch");
      setbutton(true);
      toast.error("error form send otp to catch");
      console.log("dend-otp servar error with express URI ", error);
    }


  }



  const verify_otp = async (e) => {

    e.preventDefault()

    setbutton2(false);


    if (otp == "") {
      toast("otp is requre");
      console.log("otp is requre");
      setbutton2(true);
      return;
    }

    // const otp = L.otp ;

    const details = {
      email: L.email,
      otp: otp
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
        login_save();
        setbutton2(true);
        set_resend(false);

        // const [input_email, set_input_email] = useState(false);


        // setIsActive(false);
        // setIsOpen_diglog(false);

        closeDialog();

        setIsOpen_diglog(false);

        set_input_email(true);


        // alert(data.message);
        console.log(data.message);


      } else if (data.status == 400) {


        toast(data.message);
        setbutton2(true);

      } else {
        toast("response not found");
        alert("response not found");
        console.log("response not found");
        setbutton2(true);
      }



    } catch (error) {


      // alert("Registration failed");
      // error ?  setbutton(!button) : alert("Registration failed") ;

      // setbutton(!button);

      // alert("error form send otp to catch");
      setbutton2(true);
      toast.error("error form send otp to catch");
      console.log("dend-otp servar error with express URI ", error);
    }







  }



  // useEffect(() => {
  //   // Disable scrolling when the dialog is open
  //   if (isOpen) {
  //     document.body.style.overflow = 'hidden';
  //   } else {
  //     document.body.style.overflow = 'auto'; // or 'scroll'
  //   }

  //   // Cleanup function to reset overflow when component unmounts
  //   return () => {
  //     document.body.style.overflow = 'auto';
  //   };
  // }, [isOpen]);


  // useEffect(() => {
  //   let timer;
  //   if (isActive && timeLeft > 0) {
  //     timer = setInterval(() => {
  //       setTimeLeft((prevTime) => prevTime - 1);
  //     }, 1000);
  //   } else if (timeLeft === 0) {
  //     setIsActive(false);
  //     setIsOpen_diglog(false);
  //     closeDialog();

  //   }

  //   setbutton2(true);
  // set_resend(false);

  //   return () => clearInterval(timer); // Clean up on unmount or stop
  // }, [isActive, timeLeft]);




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
      setIsActive(false);
      setIsOpen_diglog(false);
      closeDialog();
      setbutton2(true);
      set_resend(false);
      set_input_email(false);
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

        <div className='div'>

          <div className='otp_div'>
            

            <h1 style={{ mixBlendMode: "difference" }}>Enter OTP send your Email id   </h1>
            <p style={{ mixBlendMode: "difference" }}> {L.email}  </p>
         

            <form action='#' onSubmit={verify_otp}>

              <p style={{ textAlign: "center", fontSize: "2rem" }}>OTP</p>


              {/* <input style={{height :"10vh", width : "100%" , border:"1px solid black" , fontSize:"2.5rem" , placeholder:"red"}} type="text"  placeholder='.....' /> */}

              <input style={{ height: "10vh", width: "100%", border: "1px solid black", fontSize: "1.5rem", placeholder: "red" }} type="number" placeholder='...' name="otp" value={otp} onChange={set_otp_} autoFocus />



              {/* <button type='sumbit'>Submut</button> */}



              <button className='submit_login' type='submit' variant="contained">{button2 ? "verify" : "Sending ........"}</button>

              <h2>OTP expired after: {formatTime()}</h2>

          {/* <ToastContainer className="toast_div" position="top-center" /> */}

            </form>



          </div>


        </div>


        {/* <button className='clode_dilog_btn' onClick={closeDialog} >Close</button> */}

        <button className='clode_dilog_btn' onClick={closeDialog}>Close</button>

        {/* <button className='submit_login' type='submit' variant="contained">{button ? "Register" : "Sending ........"}</button> */}


      </dialog>


      <ToastContainer className="toast_div" position="top-center" />


      <div className="main_login_div">

        <div className="form">

          <h2 className='fontstyle'>| Sign up |</h2>


          {/* <form action='#' onSubmit={login_save}> */}

          {/* openDialog ,login_save ,send_otp*/}

          <form action='#' onSubmit={input_email ? login_save : send_otp } >

            <input type="text" placeholder='username' name="username" value={L.username} onChange={set_login} autoFocus />

            <input disabled={input_email} type="email" placeholder='email' name="email" value={L.email} onChange={set_login} />


            <input type="password" placeholder='password' name="password" value={L.password} onChange={set_login} />

            <input type="number" placeholder='phone' name="phone" value={L.phone} onChange={set_login} />

            {/* <button type="submit">Login</button> */}

            {/* <Button type='submit' variant="contained">Register</Button> */}

            <button className='submit_login' type='submit' variant="contained">{resend ? "Resend Otp" :(button ? "Register" : "Sending ........")}</button>
            {/* closeDialog */}

          </form>


          {/* <button onClick={startCountdown} disabled={isActive}>
        Start 5-Minute Countdown
      </button> */}

          {
            isOpen_diglog ? <button className='submit_login otp_button' onClick={openDialog}>Enter otp</button> : null

          }

          {/* <button className='submit_login' onClick={openDialog}>this open dilog</button> */}




          {/* <a className='submit_login' href="_" type="button">Sign in</a> */}


          <br /><br />

          <NavLink to="/login"><i className="fa-solid fa-person-walking-arrow-right text-black"></i>LOGIN</NavLink>
          <br /><br />




          <div className="socials">
            {/* <img src="https://i.pinimg.com/originals/b3/da/ac/b3daac6815ebf1516a545db6c3e40a36.jpg" alt="kk" />
       <img src="https://icones.pro/wp-content/uploads/2021/02/facebook-icone-orange.png" alt="kk" />    
       <img src="https://i.pinimg.com/originals/ac/cf/1d/accf1d80314304e11e2bcf9537e13304.jpg" alt="kk" />
         */}
          </div>
        </div>

        <div className="circle"></div>
        <div className="circle-1"></div>
        <div className="circle-2"></div>

      </div>


    </>
  )
}

export default Signup;
