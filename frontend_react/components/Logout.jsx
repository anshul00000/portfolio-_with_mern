import React, { useContext, useEffect } from 'react'

import { Context } from '../public/context/context_api';

import { Navigate } from 'react-router-dom';




function Logout() {
 
// const navigate =  useNavigate();
  const {delete_tooken} = useContext(Context);

  useEffect(() => {
   delete_tooken();
//    navigate("/login");
} , [] );

 
  return <Navigate to="/login" /> ;
  // return (<></>);
}

export default Logout  ; 
