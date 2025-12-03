import React, { useContext, useEffect, useState } from 'react'

import { Context } from '../../public/context/context_api';

import { toast } from 'react-toastify';


function Contact() {

  const [button, setbutton] = useState(true);


  const { user, backend_url } = useContext(Context);
  const [L, L_C] = useState({ name: "", email: "", message: "" });
  const [t, set_t] = useState(true);
  if (t && user) {

    L_C({ name: user.username, email: user.email });

    set_t(false);

    // console.log("this is from inner side ",t);
  }

  const set_login = (e) => {

    const { value, name } = e.target;

    L_C((p) => {
      return {
        ...p,
        [name]: value,
      }
    })
  };

  const login_save = async (e) => {
    e.preventDefault()
    setbutton(!button);
    // all try and catch for fetch express url 
    try {
      const response = await fetch(`${backend_url}/contact`, {
        method: "POST",     // this is default express url 

        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(L),
      })

      const data = await response.json();
      console.log(data);

      setbutton(true);

      toast("sent sussefully ✔️");



    } catch (error) {
      setbutton(true);

      console.log("register servar error with express URI ", error);
      toast.error("URL Error to insert data");
    }


    L_C((p) => {
      return {
        ...p,
        message: "",
      }
    })

  }

  // for contact to dayrect email

  useEffect(() => {
    const inputs = document.querySelectorAll(".input");

    function focusFunc() {
      let parent = this.parentNode;
      parent.classList.add("focus");
    }

    function blurFunc() {
      let parent = this.parentNode;
      if (this.value == "") {
        parent.classList.remove("focus");
      }
    }

    inputs.forEach((input) => {
      input.addEventListener("focus", focusFunc);
      input.addEventListener("blur", blurFunc);
    });

  });

  const [result, setResult] = useState();

  const onSubmit = async (event) => {

    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "19c15ea9-cc73-4fb6-9c71-2cde6ee88951");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };




  return (

    <div className="main_login_div">
      <div className="form">
        <h2 className='fontstyle'>| CONTACT |</h2>
        <form action='#' 
        // onSubmit={login_save}
        onSubmit={onSubmit}
         >
          <input type="text" placeholder='name' name="name" value={L.name} onChange={set_login} autoFocus /><br /><br />
          <input type="email" placeholder='email' name="email" value={L.email} onChange={set_login} /><br /><br />
          <textarea placeholder='Enter hear' cols={47} rows={10} type="text" name="message" value={L.message} onChange={set_login} required ></textarea>
          <br />
          {/* <Button type="submit" className='home_button' variant="outlined">Submit</Button> */}
          <button className='submit_login' type='submit' variant="contained">{button ? "SEND" : "Sending ........"}</button>
           <span>{result}</span>
        </form>

      </div>
      <div className="circle"></div>
      <div className="circle-1"></div>
      <div className="circle-2"></div>
    </div>
  )
}

export default Contact
