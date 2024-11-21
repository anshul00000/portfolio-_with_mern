import React , { useContext, useEffect, useState , useRef} from 'react'

import { Context } from '../public/context/context_api';

import {  toast } from 'react-toastify';

import { NavLink, Link , useNavigate , useLocation , useParams} from "react-router-dom";


import GitHubIcon from '@mui/icons-material/GitHub';
import LanguageIcon from '@mui/icons-material/Language';
import Follow from './Follow';



// import Project from './Project' ;

function User() {


  const { user_id } = useParams(); // Destructure 'username' from useParams
 

  const navitate = useNavigate();


  // const navigate = useNavigate();
   
   const { run_effect , set_run_effect ,state, user , backend_url ,} =  useContext(Context);
   
  //  const { set_run_effect  } =  useContext(Context);
   
  //  const {state, user , backend_url ,  } =  useContext(Context);
        

//   console.log("user id from user ");
//   console.log(user_id);

   const [user_ , set_user_] = useState([]);

   const [project_ , set_project_] = useState([]);

   const [followers , fsfs ] = useState([user_.followers]) ;
   const [following , sfsf ] =useState([user_.following]) ;
   

   const [ifol , setifol] = useState();
   const [ifoli , setifoli] = useState();


   const [show_f_user , set_f_user] = useState([]);

 
   
   const dialogRef2 = useRef(null);
 
   const [dialog2 , set_dialog2] = useState(false) ; 
  
    
   
   
   const [button , setbutton] = useState(true) ; 
 
   
   
   const [unset , set ] = useState(true) ;
   const [unset2 , set2 ] = useState(true) ;


// to get user id 
// const location = useLocation();
// const user_id = location.state?.userid;  // Access the passed state

if(user){

  if(user._id == user_id){

    navitate("/profile");

  }

}


function my_fun(){
  
 

  set(!unset);

  // toast("my_fun is working  ");

}


const closeDialog2 = () => {
  

  set_f_user([]);

 if (dialogRef2.current) {
     
   dialogRef2.current.close();
   set_dialog2(false);
 }
};




const openDialog2 = (f_user_) => {

 
 set_f_user(f_user_);

 if (dialogRef2.current) {


    dialogRef2.current.showModal();
    set_dialog2(true);
 }
};




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
      
          //  console.log("this is from check function ");
          //   console.log(data.isFollower);
          //   console.log(data.isFollowing);

           setifol(data.isFollower);
           setifoli(data.isFollowing);


          //  toast("check is called and set follow or following !");
          //  set(!unset);
         




          //  alert("data is set ifol and ifoli")
          
          }
          else{
      
            setifol();
            setifoli();
 
              // toast.error("user not found");
             
      
          }
      
      
      
      
        }catch(error) {
      
          // set_user_([]);
          console.log("not catch user details ");
      
        }
      
      

  }    

  }

  


useEffect(()=>{


      
      find_user();
      check()
      // alert("use Effect is calling !");
      // toast.error("useeffect is calling !");

}, [user ,run_effect, unset ,unset2 , ifoli , ifol])




// }, [user , unset ,unset2]);






function my_fun_2(){
  
  set2(!unset2);
  set_run_effect(!run_effect);

  // window.location.href = window.location.href; // reloads by reassigning the current URL
  
  // toast("my_fun is working  ");

}



  return (
  <>
  
  {/* <h1>Custom Prop: {username}</h1> */}

  {/* <h1>Custom Prop: {user_id}</h1>


  <h1>hyyy this is cool</h1> */}
 

  
      
<dialog ref={dialogRef2}>

{/* <h1>hyy this is list followers or following</h1> */}


<div id="follow_user_main">

{/* <h1 style={{textAlign : "center"}}>hyy this is followers of folling users list</h1> */}

<div className='user_card_div'>


{

show_f_user ? (show_f_user.map((element , index)=>(


<div className="user_card" key={element._id}>

<NavLink className="text-active-blue "

 to={`/user/${encodeURIComponent(element._id)}`}
//  to="/user"

//  state={{ userid: project.owner._id }} 
 
 > 

<div className='user_card_photo_name'>

  {/* <img  src="https://gratisography.com/wp-content/uploads/2024/01/gratisography-cyber-kitty-800x525.jpg" alt="gg" /> */}
  <img  src={`${backend_url}/public/images/${element.photo}`} alt="gg" />

  <p className='user_card_name'>{element.username}</p>

</div>


</NavLink>




<div className='user_card_details'>
       


        <p>{element.bio}</p>


       {/* <p>Followers 5</p>  <p>Following -55</p> */}

       
         <span className='followers'>{element.followers.length} followers</span>
         <span className='followers'>{element.following.length} following</span>


     <div className='profile_icon'>

          <a target='_blanck' href={element.github}><span>github <i class="fa-brands fa-github"></i></span></a>

          <a target='_blanck' href={element.linkedin}><span>linked <i class="fa-brands fa-linkedin-in"></i></span></a>


         <a target='_blanck' type='mail' href={element.email}><span>Mail <i class="fa-brands fa-google-plus-g"></i></span></a>

      </div>

          {/* <button>Fullow +</button> */}
          {/* <Follow my_id={"dvdvdssdbds"} /> */}


          
          

  </div>

  


</div>

  


))) : (  <h1>Loding ....</h1>)



}







</div>


</div>


<button className='clode_dilog_btn' onClick={closeDialog2}>Close</button>


</dialog>





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



{/* Conditional Follow button */}
{
  // followStatus[project.owner._id] ? (

    ifol && ifoli ? (
      // If both isFollower and isFollowing are true
      <>
        {/* <button>Following ✔️</button> */}
        {/* <button>Follow Back</button> */}

      <p style={{display : "inline"}} onClick={my_fun}>Following ✔️ <Follow my_id={user_._id} back={false} un_follow={true} /></p>

 
     
      </>
    ) : ifol ? (
      // If only isFollower is true
      // <button>Follow Back</button>
      // <p style={{display : "inline"}} onClick={my_fun}>this is follow back <Follow my_id={user_._id} back={true} un_follow={false} /></p>
      <p style={{display : "inline"}} onClick={my_fun}><Follow my_id={user_._id} back={true} un_follow={false} /></p>


    ) : ifoli ? (
      // If only isFollowing is true
      // <button>you Following ..</button>
      // <p style={{display : "inline"}} onClick={my_fun_2}>you Following .. <Follow my_id={user_._id} back={false} un_follow={true} /></p>
      <p style={{display : "inline"}} onClick={check}><Follow my_id={user_._id} back={false} un_follow={true} /></p>

    ) : (
      // Default follow button if neither isFollower nor isFollowing is true
      // <p onClick={()=>{run_effect(!effect_)}}> <Follow my_id={project.owner._id} /></p>
      // <p style={{display : "inline"}} onClick={my_fun}>abhi kuch nahi h to follow aan acahiye <Follow my_id={user_._id} back={false} un_follow={false} /></p>
      <p style={{display : "inline"}} onClick={my_fun}><Follow my_id={user_._id} back={false} un_follow={false} /></p>
      // <p>huu</p>
    )
  // ) : (
  //   // Default follow button while follow status is loading
  //   <Follow my_id={project.owner._id} />
  // )
}







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

export default User
