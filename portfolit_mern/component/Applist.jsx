import React, { useContext, useState } from "react";

import { NavLink, Link } from "react-router-dom";

import { Context } from "../public/context/context_api";

function Applist() {


  const { islogin } = useContext(Context);




  return (
    <>
      <nav>
        <h1 className='font header_name'>SKILLFOLIO</h1>

        
        {/* <h4>Menu</h4> */}

        {/* <i className="fas fa-bars" id="btn">MENU</i> */}

        <label for="check">


          {/* <i style={{color:"black"}}>MENU</i> */}


          <i className="fas fa-bars open_navbar"></i>


          {/* <i className="fas fa-times" id="cancel">X</i> */}


        </label>

      </nav>


      <input type="checkbox" id="check" />

      {/* <label for="check" className="closebtn">
        <i className="fas fa-bars" id="btn"></i>
        <i className="fas fa-times" id="cancel"></i>
      </label> */}

      <div className="sidebar d-block">
        <header>SKILLFOLIO</header>
        <div>

          <ul className="navigation__menu">



            <li><NavLink className="text-active-blue " to="/"><i className="fas fa-home text-blue"></i>Home page</NavLink></li>
           
            {/* state={{ fromHome: "'anshul its working'" }} */}
            <li><NavLink  to="/profile"  ><i className="fa-regular fa-id-badge text-pink"></i>Profile</NavLink></li>
            
            <li><NavLink to="/pu"><i className="fas fa-link text-red"></i>Project / upload</NavLink></li>
            
            {/* <li><NavLink to="/project"><i className="fas fa-stream text-green"></i>Project</NavLink></li> */}

            <li><NavLink to="/allproject"><i className="fas fa-stream text-green"></i>All Project</NavLink></li>
            
            {/* <li><NavLink to="/o"><i className="fas fa-calendar-week text-amber"></i>Events</NavLink></li> */}
            
            {/* <li><NavLink to="/p"><i className="far fa-question-circle text-purple"></i>About</NavLink></li> */}
           
            {/* <li><NavLink to="/q"><i className="fas fa-sliders-h text-cyan"></i>Services</NavLink></li> */}
           
            <li><NavLink to="/contact"><i className="far fa-envelope text-pink"></i>Contact</NavLink></li>




           


            {islogin ?(<li><NavLink to="/logout"><i className="fa-solid fa-user-plus text-black"></i>LOGOUT</NavLink></li>) : (<>

<li><NavLink to="/login"><i className="fa-solid fa-person-walking-arrow-right text-black"></i>LOGIN</NavLink></li>

<li><NavLink to="/signup"><i className="fa-solid fa-user-plus text-black"></i>SIGNUP</NavLink></li></>)
}




            <li>

              <label for="check" className="fas fa-times close_navbar"> Close</label>

            </li>


          </ul>
        </div>
      </div>



    </>
  )
}

export default Applist
