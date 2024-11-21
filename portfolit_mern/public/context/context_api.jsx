// const { createContext, useState } = require("react");

import { createContext, useEffect, useState } from "react";


import {  toast } from 'react-toastify';



const Context = createContext();


const Contextstate = (props)=>{

  const backend_url = 'https://portfolio-with-mern-backend.onrender.com';

    // const backend_url = 'http://localhost:3000';


    const db = async()=>{

      
   try {

    const response = await fetch(`${backend_url}/`, {
      method: 'GET',
      headers: {
        'Authorization': "application/json" ,
       },
    })

    const data = await response.json();


    console.log(data);


  data.message === "true" ? console.log(data) :  toast.error("data base error");

  // if(data.message === "true"){
  //   console.log(data)
  // }else{
  //   toast("data base error")
  // }


    
   } catch (error) {
    console.log(data);
    
   }

    }



    db();


  const {connect_db , connect_db_c} = useState();



    // const [state , setstate] = useState(localStorage.getItem("tooken"));

    const [state, setstate] = useState(localStorage.getItem("tooken") || "");

    const [user , set_user] = useState("");

    const [alluser , set_alluser] = useState([]);

    const [project , set_project] = useState([]);


    const [allproject , set_allproject] = useState([]);


    const [run_effect , set_run_effect] = useState(true);
    

    
    
    // console.log(state);
    // console.log("this is user",user);
    // console.log("this is project", project);
    
    
    let islogin = !!state ; 


    // console.log(islogin);
    
    const save_tooken = async (tooken) => {
      // async function save_tooken(tooken){
        
        // console.log(tooken);
        // await find_user();
  
        setstate(tooken);
        // my_function();
       
       localStorage.setItem("tooken" ,tooken );
       
       
       
      }
  
  
      const delete_tooken = () => {
        // async function delete_tooken(){
          // console.log(tooken);
          // await find_user();
          
          localStorage.removeItem("tooken");
          
          setstate("");
          
          set_project([]);
          
          // toast("Logout Sucsesfully");
  
  
      }
      


    // const find_user = async()=>{

      async function find_user (){
    

        try {
            
            const response = await fetch(`${backend_url}/user`, {
                method: 'GET',
                headers: {
                  'Authorization': state ,
                 },
              })
    
              const data = await response.json();


                   
              set_project(data.project_data);

               set_user(data.user_tooken);


          



          }catch(error) {
            set_user("");
            console.log("not catch user details ");

          }

    
    }



    
//  *********************************
//  ****   all users route  ******
//  *********************************



async function find_alluser (){
    

  try {
      
      const response = await fetch(`${backend_url}/users`, {
          method: 'GET',
          headers: {
            "Content-Type": "application/json" ,
           },
        })

        const data = await response.json();


        console.log("this is from all users")
         console.log("response: " + data);
             
    

         set_alluser(data.users);


    



    }catch(error) {
      set_user("");
      console.log("not catch user details ");

    }


}







//  *********************************
//  ****   all project route  ******
//  *********************************

    async function all_projects(){

      try {
    
           const response = await fetch(`${backend_url}/allproject`, {
              method: 'GET',
              headers: {
                "Content-Type": "application/json" ,
                 },
              });


              const data = await response.json();
                   
              // console.log(data.all_project_data[3]);

              // alert(data[0]);


              // set_allproject(data);

              set_allproject(data.all_project_data);

              // set_allproject([{ 1 : "ANSHUL", 2 : "Chaurasiya"} , {
              //   1 : "ANSHUL_2", 2 : "Chaurasiya_2"
              // }]) ;

                 

           

              console.log("aaa gay sare project") ;

              // set_project(data.project_data);

              //  set_user(data.user_tooken);




        
      } catch (error) {
        
        toast.error("Error in fetching all projects");
        console.log("nahi aaye sare project") ;


      }


    }

    
    
    // const my_function = ()=>{
    //   console.log("console from useeffect 🎉")
    // }

    
   
    // useEffect(() => {

    //   find_user();

    //   }, []);


    useEffect(() => {
      // if (state) {
        find_user();

        all_projects();

        find_alluser();


        // alert("chala to h ");
        // console.log("🔥🔥🔥🔥🔥🔥 this is frommmmmmm useEffffeeeeccccttttt 🔥🔥🔥🔥🔥🔥") ;

      // }
    },[state , run_effect ]);


    return (
        <Context.Provider value={{backend_url ,islogin, save_tooken , delete_tooken , user , alluser , project , run_effect , set_run_effect , state , allproject}}>
            {props.children}
        </Context.Provider>
    );

}

export {Contextstate , Context }  ;