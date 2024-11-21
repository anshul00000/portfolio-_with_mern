import React from 'react'
import {NavLink , Link} from "react-router-dom";

function Error() {
  return (
   <>
   
   <h1 className='fontstyle'>NOT FOUND</h1>


   <NavLink className="text-active-blue active" to="/"><i className="fas fa-home text-blue"></i>Dashboard</NavLink>


   
   </>
  )
}

export default Error
