import React, { useContext, useEffect, useState } from 'react';

import { Context } from '../context/context_api';



function Footer() {

 const { project } =  useContext(Context);


  

//  const [projects , set_projects] = useState("");

//  set_projects(project)

//  console.log(projects);


//  const a = user.phone ;

//  console.log(a);

 let a = 2 ;




  return (
    <div>
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
      <h1>this is footer </h1>
   
 






      {/* {
      project ? (
      project.map((element, index) => (
        // <h1 key={index}>{element.name}</h1>
        <h1 key={index}>{element.owner.username}</h1>
      ))
    ) 
    :
     (

      <h2>No projects available</h2>

    )} */}



    


   

    </div>
  )
  
}

export default Footer
