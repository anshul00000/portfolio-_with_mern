import React , { useContext, useEffect, useState , useRef} from 'react'

import { Context } from '../public/context/context_api';




import { RotatingTriangles} from 'react-loader-spinner' ;



import {  toast } from 'react-toastify';

import { NavLink, Link , useNavigate , useLocation , useParams} from "react-router-dom";


// import { useLocation } from 'react-router-dom';

import Project from './Project' ;

function Profile() {



  // const [button, setbutton] = useState(true);


  // const location = useLocation();

  // const customProp = location.state?.customProp;

  const {state, user , backend_url , project  } =  useContext(Context);
  const navigate = useNavigate();


  // if (!user) {

  //   return <NavLink className="text-active-blue "to="/login">  <h1 style={{textAlign : "center" , color : "blue"}}>first you have to login </h1> </NavLink>

  // }


  // if (!user) {

  //   navigate('/login');

  // }



  const { username } = useParams(); // Destructure 'username' from useParams




  // alert(username);



    const { run_effect , set_run_effect ,allproject } =  useContext(Context);
  
  // const { set_run_effect } =  useContext(Context);

          
  const [button , setbutton] = useState(true) ; 
   
   

    
      //  const [followers , fsfs ] = useState([user.followers]) ;
      //  const [following , sfsf ] =useState([user.following]) ;
    
       const [followers , fsfs ] = useState([]) ;
       const [following , sfsf ] =useState([]) ;


 
   const [show_f_user , set_f_user] = useState([]);

  // console.log("my followers is = >")
  // console.log(followers);
  // console.log("my following is = >")
  // console.log(following);

  const dialogRef = useRef(null);

  const dialogRef2 = useRef(null);

  const [dialog , set_dialog] = useState(false) ; 

  const [dialog2 , set_dialog2] = useState(false) ; 
 

  const location = useLocation();
  const fromHome = location.state?.fromHome;  // Access the passed state




  useEffect(() => {
    // If not authenticated, navigate to the login page after render
    if (user == undefined) {

      navigate('/login');

    }else{
      
         fsfs(user.followers || []);
      
         sfsf(user.following || []);



    }
     


  }, [user, navigate]);




  // If not authenticated, don't render anything until navigation occurs
  


  const handleShare = async () => {

    const shareUrl = `${window.location.origin}/user/${user._id}`; // Dynamically set the base URL


    console.log(shareUrl);
     
    // alert("its working ✔️");

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Check this out!',
          text: 'Take a look at this page!',
          // url: window.location.href,
          // url : "http://localhost:5173/user/"+user._id 
          url : shareUrl 
        });
        console.log('Successfully shared');
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      alert('Web Share API is not supported in your browser. You can copy the URL manually!');
    }
  };




    const [edit_user , set_edit_user] = useState({
       
        id :"",
        username : "",
        // email : "",
        // phone : "",
        bio : "",
        github : "",
        linkedin :"",
        file : null,

      });
    

    const closeDialog = () => {
  
        if (dialogRef.current) {
            set_edit_user({
                id :"",
                username : "",
                bio : "",
                github : "",
                linkedin :"",
                file : null,
            })
          dialogRef.current.close();
          set_dialog(false);
        }
      };

    const closeDialog2 = () => {
  

         set_f_user([]);
        // console.log("this is from closeDialog2");

        // console.log(show_f_user);


        if (dialogRef2.current) {
            
          dialogRef2.current.close();
          set_dialog2(false);
        }
      };
      

      const openDialog = (id , name , b , git, link) => {
       
        // alert("its working ");
       
        if (dialogRef.current) {
      
            set_edit_user({
                id :id,
                username : name,
                bio : b,
                github : git,
                linkedin : link ,
                file : null,
            })

            console.log(edit_user);

           dialogRef.current.showModal();
           set_dialog(true);
        }
      };

      const openDialog2 = (f_user_) => {
       
        // alert("its working ");

        set_f_user(f_user_);

        // console.log("this is from openDialog2");

        // console.log(show_f_user);

        // console.log(f_user_);

       
        if (dialogRef2.current) {
      
    
           dialogRef2.current.showModal();
           set_dialog2(true);
        }
      };


      const update_value=(e)=>{

        const {name , value } = e.target ; 

        set_edit_user((p)=>{
            return{
             ...p,
              [name] : value,
            }
          });
      }


      
 const handleFileChange = (e) => {

    if (e.target.files[0].type === 'image/jpeg' || e.target.files[0].type === 'image/png' || e.target.files[0].type === 'image/gif' || e.target.files[0].type === 'image/webp' || e.target.files[0].type === 'image/svg+xml') {
  
      // console.log("doneeeeeeeeeeeeee ✔️✔️✔️✔️✔️✔️");
      set_edit_user({
        ...edit_user,
        file: e.target.files[0],
      });
  
    } else {
      console.log("eeeeeeeee ❌❌❌❌❌❌❌❌❌❌❌❌❌");
      toast("❌❌ file only image ❌❌");
  
      set_edit_user({

        ...edit_user,
        file: null,

      });
  
    }
  
  };

      const update_user =async(e)=>{
        e.preventDefault();

        setbutton(false);

        const data = new FormData();


        // username : "",
        // email : "",
        // phone : "",
        // bio : "",
        // github : "",
        // linkedin :"",

        data.append('username', edit_user.username);
        // data.append('email', edit_user.email);
        // data.append('phone', edit_user.phone);
        data.append('bio', edit_user.bio);
        data.append('github', edit_user.github);
        data.append('linkedin', edit_user.linkedin);
        data.append('image', edit_user.file);

         

  try {
    
    const response = await fetch(`${backend_url}/updateuser/${edit_user.id}`, {

     method: 'PATCH',
     headers: {
       // "content-type" : "application/json",
       'Authorization': state ,

     },
     body : data,

    })

    setbutton(true);

    closeDialog();

    const result = await response.json();

    console.log(result);

    toast.success("Project Updated Successfully");

    set_run_effect(!run_effect);


 } catch (error) {
  
  setbutton(true);
    
   toast.error("Error in updating details");
   
 }



}
    

    useEffect(() => {
    
        set_run_effect(!run_effect);
       
      }, []) ; 


      // allproject.length > 0  ? (!user ? return <h1 style={{ textAlign: "center" }}>Please log in to access your profile</h1> ) : (null) ;
      
      if( allproject.length > 0 ){

        if(!user){
          return <h1 style={{ textAlign: "center" }}>Please log in to access your profile</h1> ;
        }
      }

    return (
        <>


<dialog ref={dialogRef}>

        <div className='div'>

          <div className='update_project_div'>

          <form onSubmit={update_user}>

Username
            <input type="text" value={edit_user.username} name="username" onChange={update_value} placeholder='username' />
bio
            {/* <textarea rows={5} value={edit_user.bio} name='bio' onChange={update_value} placeholder='bio'></textarea> */}
            <input value={edit_user.bio} name='bio' onChange={update_value} placeholder='bio' />
            {/* <textarea  style={{width:"200px",height:"30px" , backgroundColor :"red"}} name="area " placeholder='bioooooo'>juuu</textarea> */}
git

            <input value={edit_user.github} name='github' onChange={update_value} placeholder='github link' />
           linked
            <input value={edit_user.linkedin} name='linkedin' onChange={update_value} placeholder='linkedin link' />

photo
            <input type="file" onChange={handleFileChange} />

            {/* <button type='sumbit'>Submut</button> */}

            <button type='sumbit'>{button ? "Submit" : "Sending ..."}</button>

          </form>


          </div>


        </div>


        <button className='clode_dilog_btn' onClick={closeDialog}>Close</button>


      </dialog>




      
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
  {/* <img  src={`${backend_url}/public/images/${element.photo}`} alt="gg" /> */}

  <img src={`${backend_url}/public/images/${element.photo}`} alt="User Photo" onError={(e) => { e.target.src = 'default.jpg'; }}/>


  <p className='user_card_name'>{element.username} </p>

</div>


</NavLink>




<div className='user_card_details'>
       
        <p>{element.bio}</p>


       {/* <p>Followers 5</p>  <p>Following -55</p> */}
{/* <div> */}

         <span className='followers'>{element.followers.length} followers  {element.following.length} following</span>
         {/* <span className='followers'>{element.following.length} following</span> */}

{/* </div> */}
       


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


      {/* <h1>Custom Prop: {username}</h1> */}




{/* {
  allproject.length > 0  ? (<>

<h1>hyy this is running</h1>
  </>
  ) : (<>
   <div className='loader_div'>
    <div className='loder'>
      <div>

      </div>
    </div>
    <h1>Loading ....</h1>
    </div>
    </>
  )

 } */}


{/* <h1>hyy this is running</h1> */}



  
  
  
  
  <div className='profile_div'>

 { allproject.length > 0  ? (<>

<div className='uper_profile'>


    <div className='user_profile_image_div'>

       {/* <img  src={`${backend_url}/public/images/${user.photo}`}  alt="44535" onerror='public/default.jpg'/> */}


       <img src={`${backend_url}/public/images/${user.photo}`} alt="User Photo" onError={(e) => { e.target.src = 'default.jpg'; }}/>

       {/* <img src={`${backend_url}/public/images/${user.photo}`} alt="Description" onerror="alert('Image could not be loaded.');"> */}

         
         <p>{user.username}</p>
        {/* <img src="https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp" alt="jjjjjj" /> */}
    </div>


    <div className='profile_text'>

        {/* <h1>hyyy </h1> */}
        {/* <h1>ANSHUL CHAURASIYA </h1> */}
        <h1 className='profile_name'>{user.username}</h1>
         <p>{ user.bio }</p>
        {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum omnis esse nisi a sint deserunt, natus dolorem recusandae mollitia facere.</p> */}
         {/* <p>{ user.email }</p> */}
         {/* <p>{ user.phone }</p> */}
         {/* <p>{ user.github }</p> */}
         {/* <p>{ user.linkedin }</p> */}

        {
          project.length > 0 ? (<p>projects = {project.length}</p>) : null
        }
    

         <span onClick={()=>openDialog2(followers)} className='followers'>followers = {followers ? followers.length : "no....."}</span>
         <span onClick={()=>openDialog2(following)} className='followers'>following = {following ? following.length : "no....."}</span>

          
      
         
         
          {/* <p>following ={following.length }</p> */}




         {/* <p>This link came from {fromHome} the HomePage!</p> */}


        <div className='profile_icon'>

            <a target="_blank" href={user.github}><span>github <i class="fa-brands fa-github"></i></span>
            </a>

            <a  target="_blank" href={user.linkedin}>
                <span>linked <i class="fa-brands fa-linkedin-in"></i></span>
            </a>

            {/* <a href="">
                <span>portfolio <i class="fa-solid fa-circle-user"></i></span>
            </a> */}

            <a target="_blank" href={"mailto:"+user.email}>
                <span>Mail <i class="fa-brands fa-google-plus-g"></i></span>
            </a>

            <a target="_blank" href={"tel:"+user.phone}>
                <span>Phone <i class="fa-solid fa-phone"></i></span>
            </a>

        </div>

        {/* <button value={user._id} onClick={(e)=>{alert(e.target.value)}}>Follow </button> */}
       
       
       {/* <i class="fa-solid fa-plus fa-fade"></i> */}


{/* <button value={user._id} onClick={(e)=>{alert(e.target.value)}}>Follow + </button> */}




        {/* (id , name , b , git, link) */}

        {/* <button >Edit this </button> */}

        <button onClick={()=>openDialog(user._id , user.username , user.bio , user.github  , user.linkedin)}>Edit <i class="fa-solid fa-pencil"></i></button>
       

        {/* <button onClick={()=>openDialog2()}>Open Dilog 2 <i class="fa-solid fa-pen"></i></button> */}


        <button onClick={handleShare}>Share <i class="fa-solid fa-share-nodes"></i></button>


        <br /><br />
        <NavLink className="project_upload" to="/pu"><i class="fa-solid fa-upload"></i> Project Upload</NavLink>


    </div>

</div>


</>
  ) : (<>
 <RotatingTriangles
  visible={true}
  height="300"
  width="300"
  color="#4fa94d"
  ariaLabel="rotating-triangles-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />
    </>
   )

}

<div className='down_profile'>

<Project/>



</div>

</div>









 




        </>
    )
}

export default Profile
