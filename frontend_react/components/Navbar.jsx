// import React from 'react'
import { useContext, useEffect, useState } from "react";
import {NavLink , Link, useLocation} from "react-router-dom";
import { Context } from "../context/context_api";

import Button from '@mui/material/Button';


import FilterListIcon from '@mui/icons-material/FilterList';


function Navbar() {

const [a , set_a] =  useState(true);

 const {islogin} = useContext(Context);


 const listshow= ()=>{
  
set_a(!a);

 }

 
  return (
    <>
     
    {/* <i class="fa-solid fa-list fa-fade" class="nav_icon" ></i> */}
   
     <FilterListIcon  className="nav_icon" onClick={listshow} />
<div className="navbar"  style={{ right: a ? (`-10%`) : (`0%`)  ,  opacity : a ? (`0`) : (`1`) }}>

    <ul>
            <li className="nav_li"> <NavLink to="/"><Button variant="outlined">Home</Button></NavLink></li>
            <li className="nav_li"> <NavLink to="/about"><Button variant="outlined">About</Button></NavLink></li>
            <li className="nav_li"> <NavLink to="/contact"><Button variant="outlined">Contact</Button></NavLink></li>
            <li className="nav_li"> <NavLink to="/Projects"><Button variant="outlined">Projects</Button></NavLink></li>
            <li className="nav_li"> <NavLink to="/file"><Button variant="outlined">Project Upload</Button></NavLink></li>
            
            {islogin ? (<li className="nav_li"><NavLink to="/logout"><Button variant="outlined">Logout</Button></NavLink></li> ) : (<><li className="nav_li"><NavLink to="/Login"><Button variant="outlined">Login</Button></NavLink></li>
            <li className="nav_li"><NavLink to="/signup"><Button variant="outlined">SignUp</Button></NavLink></li></>) }
            
            
            </ul>

    </div>
    </>
  )
}




export default Navbar
