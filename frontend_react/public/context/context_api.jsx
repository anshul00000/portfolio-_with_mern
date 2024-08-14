// const { createContext, useState } = require("react");

import { createContext, useEffect, useState } from "react";

// import {  toast } from 'react-toastify';


const Context = createContext();


const Contextstate = (props)=>{


    // const [state , setstate] = useState(localStorage.getItem("tooken"));

    const [state, setstate] = useState(localStorage.getItem("tooken") || "");

    const [user , set_user] = useState("");

    const [project , set_project] = useState([]);

    const [run_effect , set_run_effect] = useState(true);
    

    const backend_url = 'https://portfolio-with-mern-backend.onrender.com';

    // const backend_url = 'http://localhost:3000';
    
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
        // console.log("find_user function called");

        try {
            
            const response = await fetch(`${backend_url}/user`, {
                method: 'GET',
                headers: {
                  'Authorization': state ,
                 },
              })
    
              const data = await response.json();

              // console.log(data)

              // if(data.user_tooken.email){

                // console.log(data.user_tooken.email);
  
              //  console.log(data.project_data);

                   
              set_project(data.project_data);

               set_user(data.user_tooken);


              // }else{

              //      console.log(data)


              // }
    
            // return data ;   

            
            // console.log(data.user_tooken);



          }catch(error) {
            set_user("");
            console.log("not catch user details ");

          }

        //  .then(response => response.json())
        //  .then(data => {
        //      console.log(data);
        //      return data ;
        //  })
        //  .catch(error => console.error('Error:', error));
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

        // alert("chala to h ");
        // console.log("🔥🔥🔥🔥🔥🔥 this is frommmmmmm useEffffeeeeccccttttt 🔥🔥🔥🔥🔥🔥") ;

      // }
    },[state , run_effect]);



    return (
        <Context.Provider value={{backend_url ,islogin, save_tooken , delete_tooken , user , project , run_effect , set_run_effect , state}}>
            {props.children}
        </Context.Provider>
    );

}

export {Contextstate , Context }  ;