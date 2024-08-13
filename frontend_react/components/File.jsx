import React, { useContext, useEffect, useState } from 'react';
import Button from '@mui/material/Button';

import { Context } from '../context/context_api';

import {  toast } from 'react-toastify';


import Footer from './Footer';

function File() {


 const { user ,backend_url} =  useContext(Context);


//  console.log("this is from user ",user.email);

//  useEffect(()=>{

  // alert("ddfdfd");

//  },[user]);


//  console.log(user);


  //  const [file, setFile] = useState({
  //     file_name: "",
  //     file: ""

  //  });
  const [file, setFile] = useState({


    name: "", 
    description: "",
    technologys: "",
    github_link: "", 
    online_link: "",
    file: null,
    
  });


  const handleFileChange = (e) => {

    if (e.target.files[0].type === 'image/jpeg' || e.target.files[0].type === 'image/png' || e.target.files[0].type === 'image/gif' || e.target.files[0].type === 'image/webp' || e.target.files[0].type === 'image/svg+xml' ) {

      // console.log("doneeeeeeeeeeeeee ✔️✔️✔️✔️✔️✔️");
      setFile({
        ...file,
        file: e.target.files[0],
      });

    } else {
      console.log("eeeeeeeee ❌❌❌❌❌❌❌❌❌❌❌❌❌");
      toast("❌❌ file only image ❌❌");

      setFile({
        ...file,
        file: "",
      });

    }

  };


  const handleTextChange = (e) => {

    const {name , value } = e.target ; 

    setFile({
      ...file,
      [name] : value,
    });
  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    const data = new FormData();

    // console.log(file.textData);

    
    data.append('name', file.name);
    data.append('description', file.description);
    data.append('technologys', file.technologys);
    data.append('github_link', file.github_link);
    data.append('online_link', file.online_link);

    data.append('image', file.file);

    data.append('owner', user._id);


    try {
      const response = await fetch(`${backend_url}/file`, {
        method: 'POST',
        body: data,
      });

      const result = await response.json();

// console.log(result);


      if(result.name){

        setFile({
          name: "", 
          description: "",
          technologys: "",
          github_link: "", 
          online_link: "",
          file: null,
          
        });
      
        toast("File uploaded successfully");

      }else{

        toast(result.message);

      }




    } catch (error) {
      console.error('Error:');
    }
  };


  // const my_function =async(e)=>{

  //    e.preventDefault()


  //     alert("file submited");

  //     console.log(file);


  //     try {
  //       const response = await fetch(`http://localhost:3000/file` , {
  //         method : "POST" ,     // this is default express url 

  //        headers : {
  //           "content-type" : "application/json",
  //           },
  //           body : JSON.stringify(file),

  //        })

  //        // toast("TRY KIYA");

  //        const data = await response.json();
  //        //  console.log(response);

  //        // toast("res aaya ");

  //         console.log(data);



  //        }catch (error) {
  //          console.log("register servar error with express URI " , error);
  //        }






  // }




  // const set_login =(e)=>{

  //     const {value , name } = e.target;


  //      setFile((p)=>{
  //          return{
  //             ...p,
  //              [name] : value,
  //          }
  //      })

  //  }







  return (
    <>
      <div>




        {/* <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} />
      <input type="text" value={file.textData} onChange={handleTextChange} />
      <button type="submit">Upload</button>
    </form> */}


        <div className='home_page_1'>
          <div>
            {/* <h1>hyy this is home page 🏠</h1> */}
            <p className='main_h1'>hyy this is Contact page for contact me </p>

            <h1 className='name_tag'> i am Anshul Chaurasiya </h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti aliquid quidem consectetur a? Voluptatem facilis tempore deleniti debitis temporibus dolorum minus blanditiis voluptatibus fuga sed praesentium quas quos, eveniet ut similique sunt!</p>
            <Button variant="contained">Contact Now</Button>
            <Button className='home_button' variant="outlined">Lern More</Button>

          </div>

          <div className='contact_form_div'>
            {/* <img src="boy-Photoroom.png" alt="" /> */}
            <form action='#' onSubmit={handleSubmit}>

              <input type="text" placeholder='Title/Name' name='name' value={file.name} onChange={handleTextChange} autoFocus /> <br /> <br />

              <textarea placeholder='Description' name='description' value={file.description} onChange={handleTextChange} ></textarea>

              <textarea placeholder='Technologys' name='technologys' value={file.technologys} onChange={handleTextChange}></textarea>

              <input type="text" placeholder='Git_hub_Link' name='github_link' value={file.github_link} onChange={handleTextChange}/> <br /> <br />

              <input type="text" placeholder='Online_Link' name="online_link" value={file.online_link} onChange={handleTextChange} /> <br /> <br />

              <input type="file" onChange={handleFileChange} /><br /><br />


              {/* <input type="text" placeholder='some text' /><br /><br /> */}
              {/* <input type="password" placeholder='password' name="password" value={} onChange={} /><br /><br /> */}
              {/* <input type="text" placeholder='phone' name="phone" value={} onChange={} /><br /><br /> */}


              <br />

              <Button type='submit' variant="contained">Submit</Button>
            </form>

          </div>



        </div>


        <Footer />




        {/* <form action="#" onSubmit={my_function}>

    <input type="text"  placeholder='file name ' name='file_name' value={file.file_name}  onChange={}/>

     <input type="file" name="file" id="file"   onChange={handleFileChange}/>
     value={file.file}
     <input type="file" name="file" id="file"  value={file.file} onChange={set_login}/>

     <button type='submit' >submit</button>

    

      </form> */}


      </div>
    </>
  )
}

export default File
