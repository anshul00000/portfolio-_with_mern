import { useEffect, useLayoutEffect, useRef, useState } from 'react'

import './App.css';
import './media.css';

import 'react-toastify/dist/ReactToastify.css';


import { Route , Routes } from 'react-router-dom' ;

import Applist from '../component/Applist';
import Login from '../component/Login';
import Background from '../component/Background';
import Hero from '../component/Hero';
import Error from '../component/Error';
import Signup from '../component/Signup';
import Project from '../component/Project';
import Projectupload from '../component/Projectupload';
import Contact from '../component/Contact';
import Logout from '../component/Logout';
import Allproject from '../component/Allproject';
import Footer from '../component/Footer';
import Profile from '../component/Profile';
import Users from '../component/users';
import Scrolltotop from '../component/Scrolltotop';
import User from '../component/User';
import Follow_user_list from '../component/Follow_user_list';

import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
import User_2 from '../component/User_2';
// ..
AOS.init();

 
function App() {


  return (
    <>
   
   <Background />
   <Applist />
   <Scrolltotop />
       <Routes>
               <Route  path="/" element={<Hero/>} />
               <Route  path="/login" element={<Login />} />
               <Route  path="/signup" element={<Signup/>} />
               <Route  path="/profile" element={<Profile />} />
               <Route  path="/user/:user_id" element={<User/>} />
               <Route  path="/user_2/:user_id" element={<User_2 />} />
               {/* <Route  path="/user" element={<User/>} /> */}
               {/* <Route  path="/project" element={<Project />} /> */}
               <Route  path="/pu" element={<Projectupload />} />
               <Route  path="/contact" element={<Contact />} />
               <Route  path="/logout" element={<Logout/>} />
               <Route  path="/allproject" element={<Allproject />} />
               <Route  path="/footer" element={<Footer />} />
               <Route  path="/users" element={<Users />} />
               <Route  path="/followers_users" element={<Follow_user_list />} />
               {/* <Route  path="/contact/Name" element={<name />} /> */}
               <Route path="/*" element={<Error/>} />
       </Routes>


<Footer />

   
    </>
  )
}

export default App
