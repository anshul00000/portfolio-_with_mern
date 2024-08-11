import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css';
import{ Contextstate} from '../context/context_api';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <BrowserRouter>
<Contextstate>
    <ToastContainer />   {/* for notification */}
     <App />
   </Contextstate>
   </BrowserRouter>
  // {/* </React.StrictMode>,  */}

  
)
