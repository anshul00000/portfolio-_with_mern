import { useEffect, useState } from 'react';
import './App.css';

// this css for notifaction 
import 'react-toastify/dist/ReactToastify.css';

import 'bootstrap/dist/css/bootstrap.min.css';


import {Route , Routes} from 'react-router-dom' ;
import Contact from '../components/Contact';
import Error from '../components/Error';
import Home from '../components/Home';
import Navbar from '../components/Navbar';
import About from '../components/About';
import Services from '../components/Services';
import Login from '../components/Login';
import Signup from '../components/Signup';
import Logout from '../components/Logout';
import File from '../components/File';
import Appbar from '../components/Appbar';

function App() {

  useEffect(() => {
    document.body.style.width = '100%';
    document.body.style.height = '100vh';
    document.body.style.overflow = 'hidden';
    document.body.style.border = '1px solid black';
  }, []);


  return (
    <>
   
{/* <Navbar/> */}

<Appbar/>

     <Routes>
             
             <Route  path="/" element={<Home/>} />
             <Route  path="/about" element={<About/>} />
             <Route  path="/contact" element={<Contact/>} />
             <Route  path="/projects" element={<Services/>} />
             <Route  path="/login" element={<Login />} />
             <Route  path="/signup" element={<Signup/>} />
             <Route  path="/logout" element={<Logout/>} />
             <Route  path="/file" element={<File/>} />
             {/* <Route  path="/contact/Name" element={<name />} /> */}
             <Route path="/*" element={<Error />} />
     </Routes>


    
    </>

    
  )
}

export default App
