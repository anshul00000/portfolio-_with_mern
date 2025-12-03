import React, { useContext, useEffect, useState, useRef } from 'react'

import { Context } from '../../public/context/context_api';

import { toast } from 'react-toastify';

import { NavLink } from "react-router-dom";



function Follow({ my_id, back, un_follow }) {

  const { state, user, backend_url, } = useContext(Context);


  let user_id = user ? user._id : null;

  const [button, set_button] = useState(false);

  const follow = async () => {


    // alert("this is follow function! its working ! ");
    // toast.success("this is follow function success !");

    try {

      const response = await fetch(`${backend_url}/follow`, {
        method: 'POST',
        headers: {
          'Authorization': state,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ my_id, user_id }),

      })

      const data = await response.json();




      if (data.updatedproject) {


        toast.success("followed successfully");
        // alert("followed successfully");
        //   console.log(data.my_id)
        // console.log(data.updatedproject)
      }
      else {

        toast.error("user not found");

        // console.log(data);

      }




    } catch (error) {

      toast.error("from catch user not found");

      console.log(error);

    }



  }

  const unfollow = async () => {


    // alert("this is un_follow function! its working ! ");
    // toast.success("this is un_follow function success !");


    // alert("its working ! ");
    // toast.success("success !");

    try {

      const response = await fetch(`${backend_url}/unfollow`, {
        method: 'POST',
        headers: {
          'Authorization': state,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ my_id, user_id }),

      })

      const data = await response.json();




      if (data.updatedproject) {


        toast.success("un_followed successfully");
        // alert("followed successfully");
        //   console.log(data.my_id)
        // console.log(data.updatedproject)

        // window.location.href = window.location.href; // reloads by reassigning the current URL

      }
      else {

        toast.error("user not found");

        // console.log(data);

      }




    } catch (error) {

      toast.error("from catch user not found");

      console.log(error);

    }



  }



  return (
    <>
      {user ? (
        <button className='follow_btn' value={my_id} onClick={un_follow ? unfollow : follow}>
          {button ? (
            "......"
          ) : (
            <>
              {un_follow ? (
                <>
                  <i className="fa-solid fa-user-check"></i>
                  Following
                </>
              ) : back ? (
                <>
                  <i className="fa-solid fa-user-plus"></i>
                  Follow Back
                </>
              ) : (
                <>
                  <i className="fa-solid fa-user-plus"></i>
                  Follow
                </>
              )}
            </>
          )}
        </button>
      ) : (
        <NavLink className="text-active-blue" to="/login">
          <button className='follow_btn'>
            <i className="fa-solid fa-right-to-bracket"></i>
            Login to Follow
          </button>
        </NavLink>
      )}
    </>
  )
}

export default Follow
