import React, { useContext, useEffect, useRef, useState } from 'react'

import { Context } from '../public/context/context_api';

import {  toast } from 'react-toastify';




import { MutatingDots} from 'react-loader-spinner' ;



import GitHubIcon from '@mui/icons-material/GitHub';
import LanguageIcon from '@mui/icons-material/Language';



import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

import { ScrollTrigger } from 'gsap/ScrollTrigger';


function Project() {

  gsap.registerPlugin(ScrollTrigger);


  const { run_effect } =  useContext(Context);
  
  const { set_run_effect } =  useContext(Context);

  const { state , backend_url } =  useContext(Context);

  const [button, setbutton] = useState(true);


  const [project_details , set_project_details] = useState({
   id : "",
   name: "", 
   description: "",
   technologys: "",
   github_link: "",
   online_link: "",
   file: null,
    
  });


 const [dialog , set_dialog] = useState(false) ; 


 const dialogRef = useRef(null);


 const handleFileChange = (e) => {

  if (e.target.files[0].type === 'image/jpeg' || e.target.files[0].type === 'image/png' || e.target.files[0].type === 'image/gif' || e.target.files[0].type === 'image/webp' || e.target.files[0].type === 'image/svg+xml') {

    // console.log("doneeeeeeeeeeeeee ✔️✔️✔️✔️✔️✔️");
    set_project_details({
      ...project_details,
      file: e.target.files[0],
    });

  } else {
    console.log("eeeeeeeee ❌❌❌❌❌❌❌❌❌❌❌❌❌");
    toast("❌❌ file only image ❌❌");

    set_project_details({
      ...project_details,
      file: null,
    });

  }

};


 const update_value =(e)=>{

  const {name , value } = e.target ; 

  set_project_details((p)=>{
    return{
     ...p,
      [name] : value,
    }
  });


 }

 const update_project =async(e)=>{

   e.preventDefault();

  setbutton(false);


  // toast(project_details);
  // alert(project_details);

  // console.log(project_details);

  const data = new FormData();

  
    data.append('name', project_details.name);
    data.append('description', project_details.description);
    data.append('technologys', project_details.technologys);

    // github_link: "",
    // online_link: "",

    data.append('github_link', project_details.github_link);
    data.append('online_link', project_details.online_link);

    data.append('image', project_details.file);




  try {
    
     const response = await fetch(`${backend_url}/updateproject/${project_details.id}`, {

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

    toast.error("Error in saving project");
    
  }


 }

  
 const openDialog = (id , n , d , t , gl ,ol) => {
  if (dialogRef.current) {

    set_project_details({
      id : id,
      name: n,
      description: d,
      technologys: t,
      github_link: gl,
      online_link: ol,
    })
     dialogRef.current.showModal();
    set_dialog(true);
  }
};

const closeDialog = () => {
  
  if (dialogRef.current) {
    set_project_details({
      id : "",
      name: "", 
      description: "",
      technologys: "",
      github_link: "",
      online_link: "",
      file: null,
    })
    dialogRef.current.close();
    set_dialog(false);
  }
};



  useEffect(() => {
    
    const root = document.getElementById("root");


    // root.classList.add('no-scroll');
    //  root.classList.remove('no-scroll');
    set_run_effect(!run_effect);
   
  }, []) ; 
  
  
  const { project } =  useContext(Context);


  const edit_p=(id)=>{

alert(id);


  }


 const delete_p = async (image , id)=>{

  const y_n = confirm(`Are you sure`);

  if(y_n == true)
  {

  const response = await fetch(`${backend_url}/deletefile/${id}/image/${image}` , {
    
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }    // this is default express url 
   
   })
  
    const data = await response.json();

    set_run_effect(!run_effect);

    console.log(data);
   
     console.log("sent successfully");

    toast(`sent sussefully ✔️${data.message} `);

  // console.log(image);
}else{
  
  // console.log("ok ❣️");

  toast(`ok ❣️ `);
}

 }

 
 useGSAP(()=>{
 
 
  


})


  return (

   <>

{/* 
<dialog id="myDialog" open={dialog}>

        <h1>hyy this is dailog</h1>
        <button id="closeDialog">colse</button>

    </dialog> */}


{/* <button className='clode_dilog_btn' onClick={closeDialog}>XXX</button> */}


      <dialog ref={dialogRef}>
        {/* <p>This is a dialog</p>
        <button onClick={closeDialog}>Close</button> */}

        <div className='div'>

          <div className='update_project_div'>

          <form onSubmit={update_project}>

            <input type="text" value={project_details.name} name="name" onChange={update_value} placeholder='name' />

            <textarea rows={5} value={project_details.description} name='description' onChange={update_value} placeholder='about'></textarea>

            <textarea rows={5} value={project_details.technologys} name='technologys' onChange={update_value} placeholder='technologys'></textarea>

            {/* github_link: "",
            online_link: "", */}

            <input type="text"  value={project_details.github_link} name="github_link" onChange={update_value} placeholder='github_link' />

            <input type="text"  value={project_details.online_link} name="online_link" onChange={update_value} placeholder='online_link ' />

            <input type="file" onChange={handleFileChange} />

            {/* <button type='sumbit'>Submut</button> */}

            <button type='sumbit'>{button ? "Submit" : "Sending ..."}</button>


          </form>

          {/* <h1>hy</h1>
          <h1>hy2</h1>
          <h1>hy3</h1>
          <h1>hy4</h1> */}

          </div>


        </div>


        <button className='clode_dilog_btn' onClick={closeDialog}>Close</button>


      </dialog>



   <div className="project_main_box">
  
   <h1  className='font red_h1 project_h1 '>Projects</h1>
   {/* <h1 className='main_h1 red_h1 project_h1 '>{data.name}</h1> */}
    
    <div>
    {/* .length > 0 */}
    
    {
     
      project.length > 0  ? (
      project.map((element, index) => (
        
        // <h1 key={index}>{element.name}</h1>
        <>
        {/* <div key={index} > */}
        <h1 className='main_h1' >{element.name}</h1>


        <div data-aos="zoom-in" className='project_div' >

          <div className='project_div_text'>
          <span className='main_h1'>about this - </span>
          <p>{element.description} </p>
          <span className='main_h1'>Technologys - </span>
          <p> {element.technologys} </p>

         <div className='project_links'>
          
          <a href={element.github_link} target='_blanck'>  <GitHubIcon className='icon' sx={{ fontSize: 30 }} /></a>
          <a href={element.online_link} target='_blanck'>   <LanguageIcon className='icon'  sx={{ fontSize: 30 }}/></a>
        
           <button onClick={()=>openDialog(element._id , element.name , element.description , element.technologys , element.github_link , element.online_link)} ><i class="fa-solid fa-pencil"></i></button>
         
          <button type='button' onClick={() => delete_p(element.image , element._id)} ><i class="fa-regular fa-trash-can"></i></button>

         </div>
          
        

          {/* <button onClick={()=>openDialog(element._id , element.name , element.description , element.technologys)}>Edit </button> */}
          
          {/* <button type='button' onClick={() => edit_p(element._id)}>Edit</button> */}
          
          {/* <button type='button' onClick={() => delete_p(element.image , element._id)}>delete this Project</button> */}
    


          </div>


          <a href={element.online_link} target='_blanck'> 


          <div className='project_div_image'>


          {/* <img src={`users/${element.image}`} alt="" /> */}

          {/* `${backend_url}/deletefile/${id}/image/${image}` */}

          {/* <img className='project_img' src={`${backend_url}/public/images/${element.image}`} alt="gfgn" /> */}




         <img src={`${backend_url}/public/images/${element.image}`} alt="Porject demo" onError={(e) => { e.target.src = 'default_project.jpg'; }}/>

  
          

          </div>

          </a>

        
        </div>
        </>
       
      ))
    ) 
    :
     (
<>

<MutatingDots
  visible={true}
  height="100"
  width="100"
  color="black"
  secondaryColor="black"
  radius="12.5"
  ariaLabel="mutating-dots-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />
{/* <h2>No projects available ...</h2> */}

</>

    )}



  


    </div>

   </div>

   </>
  )
}

export default Project 
