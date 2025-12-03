import { useEffect, useLayoutEffect, useRef, useState } from 'react'

import './App.css';
import './media.css';

import 'react-toastify/dist/ReactToastify.css';


import { Route , Routes } from 'react-router-dom' ;

import Applist from '../component/Applist/Applist';
import Login from '../component/Login/Login';
import Background from '../component/Background/Background';
import Hero from '../component/Hero/Hero';
import Error from '../component/Error/Error';
import Signup from '../component/Signup/Signup';
import Project from '../component/Project/Project';
import Projectupload from '../component/Projectupload/Projectupload';
import Contact from '../component/Contact/Contact';
import Logout from '../component/Logout/Logout';
import Allproject from '../component/Allproject/Allproject';
import Footer from '../component/Footer/Footer';
import Profile from '../component/Profile/Profile';
import Users from '../component/Users/Users';
import Scrolltotop from '../component/Scrolltotop/Scrolltotop';
import User from '../component/User/User';
import Follow_user_list from '../component/Follow_user_list/Follow_user_list';

import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
import User_2 from '../component/User_2/User_2';
import EditProfile from '../component/EditProfile/EditProfile';
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
                <Route path="/edit-profile" element={<EditProfile />} />
               {/* <Route  path="/contact/Name" element={<name />} /> */}
               <Route path="/*" element={<Error/>} />
       </Routes>


<Footer />

   
    </>
  )
}

export default App
