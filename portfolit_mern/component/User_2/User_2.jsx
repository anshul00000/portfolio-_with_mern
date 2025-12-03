import React , { useContext, useEffect, useState , useRef} from 'react'

import { Context } from '../../public/context/context_api';

import {  toast } from 'react-toastify';

import { NavLink, Link , useNavigate , useLocation , useParams} from "react-router-dom";


import GitHubIcon from '@mui/icons-material/GitHub';
import LanguageIcon from '@mui/icons-material/Language';
import Follow from '../Follow/Follow';


function User_2() {
 
   
  const navitate = useNavigate();

  const { user_id } = useParams(); // Destructure 'username' from useParams
 
  const { run_effect , set_run_effect ,state, user , backend_url ,} =  useContext(Context);
  
  const [user_ , set_user_] = useState([]);

  const [project_ , set_project_] = useState([]);

  const [followers , fsfs ] = useState([]) ;

  const [following , sfsf ] =useState([]) ;
  

  if(user){

    if(user._id == user_id){
  
      navitate("/profile");
  
    }
  
  }

  const find_user =async()=>{
    
    try {
        
      const response = await fetch(`${backend_url}/auser`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json" ,
           },
          body : JSON.stringify({ user_id }),
           
        })
  
        const data = await response.json();
  
  
      //   console.log("this is from all users")
        //  console.log("response: " + data.user_deails);
             
    
      if(data.user_deails){
  
          set_user_(data.user_deails);
          set_project_(data.project_details)
  
          fsfs(data.user_deails.followers);
  
          sfsf(data.user_deails.following);
            
  
  
        //   console.log(data.project_details)
          // alert("aa gya ")
      }
      else{
  
          toast.error("user not found");
          // alert("user not found");
  
      }
  
  
  
  
    }catch(error) {
  
      set_user_([]);
      set_project_([]);
      console.log("not catch user details ");
  
    }
  

  
  }
  

  const check =async()=>{
          
    if(user){
  
        try {
            
            const response = await fetch(`${backend_url}/checkfollow`, {
                method: 'POST',
                headers: {
  
                    'Authorization': state ,
                    "Content-Type": "application/json" ,
                 },
                body : JSON.stringify({ user_id }),
                 
              })
        
              const data = await response.json();
        
        
            //   console.log("this is from all users")
              //  console.log("response: " + data.user_deails);
                   
          
            if(data.isFollower || data.isFollowing){
        
             
             setifol(data.isFollower);
             setifoli(data.isFollowing);
  
  
  
            //  toast("check is called and set follow or following !");
            //  set(!unset);
           
  
  
  
  
            //  alert("data is set ifol and ifoli");
  
  
            
            }
            // else{
        
            //     toast.error("user not found");
               
        
            // }
        
        
        
        
          }catch(error) {
        
            // set_user_([]);
            console.log("not catch user details ");
        
          }
        
        
  
    }    
  
    }



  useEffect(()=>{


      
    // alert("use Effect is calling !");
  
    const cool =async()=>{
  
      await find_user();
      // await check()
    
    }
  
    cool();
  
   
  }, [user]) ; 
  
  


  return (

    <>
    <div>
      <h1>htt this is user_2</h1>
      <h1>{user_id}</h1>
    </div>



     
  <div className='profile_div'>

<div className='uper_profile'>

    <div className='user_profile_image_div'>


       {/* <img  src={`${backend_url}/public/images/${user_.photo}`} alt="44535" /> */}

  <img src={`${backend_url}/public/images/${user_.photo}`} alt="." onError={(e) => { e.target.src = '/default.jpg'; }}/>
       
         
         <p>{user_.username}</p>

       
        {/* <img src="https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp" alt="jjjjjj" /> */}
    </div>


    <div className='profile_text'>


        {/* <h1>hyyy </h1> */}
        {/* <h1>ANSHUL CHAURASIYA </h1> */}
        <h1>{user_.username}</h1>
        {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum omnis esse nisi a sint deserunt, natus dolorem recusandae mollitia facere.</p> */}
         {/* <p>{ user_.email }</p> */}
         {/* <p>{ user_.phone }</p> */}
         <p>{ user_.bio }</p>
         {/* <p>{ user_.github }</p> */}
         {/* <p>{ user_.linkedin }</p> */}


         {/* <p>followers = { user_.followers }</p> */}
         {/* <p>following ={ user_.following }</p> */}

         {/* <p>followers = {followers ? followers.length : "no....."}</p>
         <p>following = {following ? following.length : "no....."}</p>
         */}


           <span  onClick={()=>openDialog2(followers)} className='followers'>followers = {followers ? followers.length : "no....."}</span>
          
           <span onClick={()=>openDialog2(following)} className='followers'>following = {following ? following.length : "no....."}</span>

                          

         {/* <p>This link came from {fromHome} the HomePage!</p> */}
      

      

         <div className='profile_icon'>

<a target="_blank" href={user_.github}><span>github <i class="fa-brands fa-github"></i></span>
</a>

<a  target="_blank" href={user_.linkedin}>
    <span>linked <i class="fa-brands fa-linkedin-in"></i></span>
</a>

{/* <a href="">
    <span>portfolio <i class="fa-solid fa-circle-user"></i></span>
</a> */}

<a target="_blank" href={"mailto:"+user_.email}>
    <span>Mail <i class="fa-brands fa-google-plus-g"></i></span>
</a>

<a target="_blank" href={"tel:"+user_.phone}>
    <span>Phone <i class="fa-solid fa-phone"></i></span>
</a>

</div>


      
        {/* <div className='profile_icon'>

            <a href=""><span>github <i class="fa-brands fa-github"></i></span>
            </a>

            <a href="">
                <span>linked <i class="fa-brands fa-linkedin-in"></i></span>
            </a>

            <a href="">
                <span>portfolio <i class="fa-solid fa-circle-user"></i></span>
            </a>

            <a href="">
                <span>Mail <i class="fa-brands fa-google-plus-g"></i></span>
            </a>

        </div> */}

        {/* <button value={user._id} onClick={(e)=>{alert(e.target.value)}}>Follow </button> */}
       
       
       {/* <i class="fa-solid fa-plus fa-fade"></i> */}


       {/* <Follow onClick={my_fun} my_id={user_._id} /> */}





{/* {
    ifoli ? <button >Following ✔️ </button> : <p style={{display : "inline"}} onClick={my_fun}> <Follow my_id={user_._id} /></p>
}

{
    ifol ? <button >Follow back </button>  : null 
} */}








{/* <button onclick={()=> alert("hyy")}>click me </button> */}

{/* <button onClick={my_fun}>click me 2</button> */}




{/* <button value={user_._id} onClick={(e)=>{alert(e.target.value)}}>Follow + </button> */}




        {/* (id , name , b , git, link) */}

        {/* <button >Edit this </button> */}

        {/* <button onClick={()=>openDialog(user._id , user.username , user.bio , user.github  , user.linkedin)}>Edit <i class="fa-solid fa-pencil"></i></button> */}
       
       
        <button>Share <i class="fa-solid fa-share-nodes"></i></button>
        <br /><br />
        {/* <NavLink className="project_upload" to="/pu"><i class="fa-solid fa-upload"></i> Project Upload</NavLink> */}


    </div>

</div>

<div className='down_profile'>



{/* <Project /> */}


<div className="project_main_box">
  
  <h1 className='main_h1 red_h1 project_h1 '>Projects</h1>
  {/* <h1 className='main_h1 red_h1 project_h1 '>{data.name}</h1> */}
   
   <div>
   {/* .length > 0 */}
   
   {
    
    project_.length ? (
        project_.map((element, index) => (
       
       // <h1 key={index}>{element.name}</h1>
       <>
       {/* <div key={index} > */}
       <h1 className='main_h1' >{element.name}</h1>


       <div data-aos="zoom-in" className='project_div ' >

         <div className='project_div_text'>
         <span className='main_h1'>about this - </span>
         <p>{element.description} </p>
         <span className='main_h1'>Technologys - </span>
         <p> {element.technologys} </p>

        <div className='project_links'>
         <a href={element.github_link} target='_blanck'>  <GitHubIcon className='icon' sx={{ fontSize: 30 }} /></a>
         <a href={element.online_link} target='_blanck'>   <LanguageIcon className='icon'  sx={{ fontSize: 30 }}/></a>
        </div>
         
       

         {/* <button onClick={()=>openDialog(element._id , element.name , element.description , element.technologys)}>Edit </button> */}
         {/* <button type='button' onClick={() => edit_p(element._id)}>Edit</button> */}
         
         {/* <button type='button' onClick={() => delete_p(element.image , element._id)}>delete this Project</button> */}
   


         </div>

         <div className='project_div_image'>


         {/* <img src={`users/${element.image}`} alt="" /> */}

         {/* `${backend_url}/deletefile/${id}/image/${image}` */}

         {/* <img className='project_img' src={`${backend_url}/public/images/${element.image}`} alt="gfgn" /> */}

  <img className='project_img' src={`${backend_url}/public/images/${element.image}`} alt="." onError={(e) => { e.target.src = '/default_project.jpg'; }}/>


         

         </div>

       
       </div>
       </>
      
     ))
   ) 
   :
    (

     <h2>No projects available ...</h2>
     
    )
    
  }

  {/* <h2>No projects available ...</h2> */}


 


   </div>

  </div>



</div>

</div>




    </>

  )
}

export default User_2

