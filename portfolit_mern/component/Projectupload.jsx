import React, { useContext, useEffect, useState } from 'react';

import { Context } from '../public/context/context_api';

import { toast } from 'react-toastify';

import { NavLink, Link, useNavigate, useLocation, useParams } from "react-router-dom";



function Projectupload() {


  const [button, setbutton] = useState(true);


  const { user, backend_url , allproject } = useContext(Context);

  const navigate = useNavigate();





  useEffect(() => {
    // If not authenticated, navigate to the login page after render
    if (user == undefined) {

      navigate('/login');

    } 


  }, [user, navigate]);





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

    if (e.target.files[0].type === 'image/jpeg' || e.target.files[0].type === 'image/png' || e.target.files[0].type === 'image/gif' || e.target.files[0].type === 'image/webp' || e.target.files[0].type === 'image/svg+xml') {

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

    const { name, value } = e.target;

    setFile({
      ...file,
      [name]: value,
    });
  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    setbutton(!button);


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


      if (result.name) {

        setFile({
          name: "",
          description: "",
          technologys: "",
          github_link: "",
          online_link: "",
          file: null,

        });

        setbutton(true);


        toast("File uploaded successfully");

      } else {

        toast(result.message);
        setbutton(true);


      }




    } catch (error) {
      setbutton(true);
      toast.error("error to upload ");

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


  // if (!user) {
  //   return <h1 style={{ textAlign: "center" }}>Please log in to upload projects</h1>;
  // }

  if( allproject.length > 0 ){

    if(!user){
      return <h1 style={{ textAlign: "center" }}>Please log in to access your profile</h1> ;
    }
  }


  return (
    <>



      <div className="main_login_div">

        <div className="form">

          <h2 className='fontstyle'>| UPLOAD PROJECTS |</h2>



          <form action='#' onSubmit={handleSubmit}>

            <input type="text" placeholder='Title/Name' name='name' value={file.name} onChange={handleTextChange} autoFocus /> <br /> <br />

            <textarea placeholder='Description' name='description' value={file.description} onChange={handleTextChange} ></textarea>

            <textarea placeholder='Technologys' name='technologys' value={file.technologys} onChange={handleTextChange}></textarea>

            <input type="text" placeholder='Git_hub_Link' name='github_link' value={file.github_link} onChange={handleTextChange} /> <br /> <br />

            <input type="text" placeholder='Online_Link' name="online_link" value={file.online_link} onChange={handleTextChange} /> <br /> <br />

            <input type="file" onChange={handleFileChange} />

            {/* <br /><br /> */}


            {/* <input type="text" placeholder='some text' /><br /><br /> */}
            {/* <input type="password" placeholder='password' name="password" value={} onChange={} /><br /><br /> */}
            {/* <input type="text" placeholder='phone' name="phone" value={} onChange={} /><br /><br /> */}


            {/* <br /> */}

            {/* <Button type='submit' variant="contained">Submit</Button> */}
            {/* <button>click</button>
            <button>click</button>
            <button>click</button>
            <button>click</button> */}

            <button className='submit_login' type='submit' variant="contained">{button ? "UPLOAD" : "Sending ........"}</button>
            {/* <button  type='submit' variant="contained">{button ? "UPLOAD" : "Sending ........"}</button> */}

          </form>













        </div>

        <div className="circle"></div>
        <div className="circle-1"></div>
        <div className="circle-2"></div>

      </div>




    </>
  )
}

export default Projectupload
