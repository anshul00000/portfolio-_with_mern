import React, { useContext, useEffect, useRef, useState } from 'react'

import { Context } from '../public/context/context_api';

import {  toast } from 'react-toastify';

function Users() {

    const { backend_url } =  useContext(Context);

    
    const { alluser } =  useContext(Context);

     console.log("this is all users")
     console.log(alluser) ;

  return (
   <>
   { 
   alluser.map((user , index)=>(
          <>
        <div style={{backgroundColor:"gray" ,margin : "100px" }} key={index}>
        {/* <h3>{user.username}</h3> */}
        {/* <p>{user.email}</p> */}
        {/* <p>{user.phone}</p> */}
        {/* <p>{user.website}</p> */}

        <p>{ user._id }</p>
        <p>{ user.email }</p>
                         <p>{ user.phone }</p>
                         <p>{ user.bio }</p>
                         <p>{ user.github }</p>
                         <p>{ user.linkedin }</p>
                        
                         <img style={{width:"200px"}} src={`${backend_url}/public/images/${user.photo}`} alt="44535" />
       
        </div>
        </>
        ) 

  )


   }

 <h1>hyy this is users</h1>

 {/* <p>{ user[0].email }</p> */}
   
   </>
  )
}

export default Users
