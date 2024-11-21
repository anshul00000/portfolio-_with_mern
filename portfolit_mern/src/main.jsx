import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import './index_2.css'

import{ Contextstate} from '../public/context/context_api';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

createRoot(document.getElementById('root')).render(

  // <React.StrictMode>
  <BrowserRouter>
<Contextstate>
    <ToastContainer />   {/* for notification */}
     <App />
   </Contextstate>
   </BrowserRouter>
  //  {/* </React.StrictMode>,  */}

)
