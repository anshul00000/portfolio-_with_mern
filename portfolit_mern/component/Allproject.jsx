import React, { useContext, useEffect, useState } from 'react';

import { FallingLines } from 'react-loader-spinner';

import { Context } from '../public/context/context_api';

import { toast } from 'react-toastify';


import { NavLink, Link } from "react-router-dom";



import GitHubIcon from '@mui/icons-material/GitHub';
import LanguageIcon from '@mui/icons-material/Language';

import Follow from './Follow';


function Allproject() {



  // const [if_if , set_if_if] = useState();

  const [effect_, run_effect] = useState(true);
  // run_effect(!effect_)

  const [followStatus, setFollowStatus] = useState({});

  const { user, state, backend_url, allproject } = useContext(Context);




  // console.log("this is al projects ") ;

  //  console.log(allproject);
  //  console.log("this is al projects ") ;


  useEffect(() => {
    // Fetch follow status for each project owner when `allproject` updates
    const fetchFollowStatus = async () => {
      const status = {};
      for (let project of allproject) {
        const userId = project.owner._id;
        if (user) {
          try {
            const response = await fetch(`${backend_url}/checkfollow`, {
              method: 'POST',
              headers: {
                'Authorization': state,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ user_id: userId }),
            });
            const data = await response.json();


            // status[userId] = data.isFollower;


            // Store both isFollower and isFollowing in followStatus
            status[userId] = {
              isFollower: data.isFollower,
              isFollowing: data.isFollowing
            };



          } catch (error) {
            console.log("Error fetching follow status:", error);
          }
        }
      }
      setFollowStatus(status);
    };

    fetchFollowStatus();
  }, [allproject, user, backend_url, state, effect_]);





  return (
    <>



      {/* {
    allproject.length === 0 ? <p>Loading...</p> : <><p>aa gay na </p></>  // if no project then show loading text
 
} */}


      {/* <h1 className='all_project_h1 font'>◀ ↴ project ↴ ▶</h1> */}
      <h1 className='all_project_h1 font'> ↴ project ↴ </h1>




      <div className="all_project_div">




        {/* 
{

allproject.length > 0 ? ( <h1>hii</h1>) : ( <h1>byy</h1>)

} */}




        {

          allproject.length > 0 ? (



            allproject.map((project, index) => (

              <>


                <div data-aos="zoom-in" key={project._id} className="project_box2">


                  <div className='project_flex'>

                    <div className='project_details'>
                      <h1 className='font'>{project.name}</h1>



                      <div className='porject_div_link_img'>


                        <div className='kuchbhi'>



                          <p><span className='project_title'> </span><br />{project.description}.</p>

                          <p><span className='project_title'> </span><br />{project.technologys}</p>



                          <p style={{ display: "inline" }}>


                            <a href={project.github_link} target='_blank'><span className='project_title'> </span>  <GitHubIcon className='icon' sx={{ fontSize: 30 }} /> </a>

                          </p>

                          <p style={{ display: "inline" }}>

                            <a href={project.online_link} target='_blank'><span className='project_title'></span>  <LanguageIcon className='icon' sx={{ fontSize: 30 }} /> </a>

                          </p>

                        </div>


                        <a href={project.online_link} target='_blank'>

                          <div className='all_project_img'>


                            {/* <img src={`${backend_url}/public/images/${project.image}`} alt="44535" /> */}

                            <img src={project.image} alt="Porject demo" onError={(e) => { e.target.src = 'default_project.jpg'; }} />
                          </div>

                        </a>

                      </div>

                    </div>

                    {/* user details  */}

                    <NavLink className="text-active-blue "

                      to={`/user/${encodeURIComponent(project.owner._id)}`}
                    //  to="/user"

                    //  state={{ userid: project.owner._id }} 

                    >

                      <div className='project_user'>



                        <div className='project_user_img'>

                          {/* <img src="https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp" alt="jjjjjj" /> */}

                          {/* <img  src={`${backend_url}/public/images/${project.owner.photo}`} alt="44535" /> */}

                          <img src={project.owner.photo} alt="Porject demo" onError={(e) => { e.target.src = 'default.jpg'; }} />

                        </div>
                        <div>
                          <p>{project.owner.username}</p>
                          {/* <Follow my_id={project.owner._id} /> */}
                          {/* <Follow my_id={"hyyhyhyhyhy"} /> */}

                          {/* {

set_if_if(check(project.owner._id)) 


if_if ? <button >Following ✔️ </button>  : <Follow my_id={"hyyhyhyhyhy"} />


} */}


                          {/* Conditional Follow button */}
                          {/* {
         followStatus[project.owner._id] 
          ? <button>Following ✔️</button> 
          : <Follow my_id={project.owner._id} />
    } */}




                          {/* Conditional Follow button */}
                          {/* {followStatus[project.owner._id] ? (
                    followStatus[project.owner._id].isFollower && followStatus[project.owner._id].isFollowing ? (
                      <button>Following ✔️</button>
                    ) : (
                      <Follow my_id={project.owner._id} />
                    )
                  ) : (
                    <Follow my_id={project.owner._id} />
                  )} */}



                          {/* Conditional Follow button */}
                          {
                            user ? (user._id !== project.owner._id ? (
                              followStatus[project.owner._id] ? (
                                followStatus[project.owner._id].isFollower && followStatus[project.owner._id].isFollowing ? (
                                  // If both isFollower and isFollowing are true
                                  <>
                                    <button>Following ✔️</button>
                                    {/* <button>Follow Back</button> */}


                                  </>
                                ) : followStatus[project.owner._id].isFollower ? (
                                  // If only isFollower is true
                                  // <button>Follow Back</button>
                                  <p style={{ display: "inline" }} onClick={() => { run_effect(!effect_) }}><Follow my_id={project.owner._id} back={true} un_follow={false} /></p>

                                ) : followStatus[project.owner._id].isFollowing ? (
                                  // If only isFollowing is true
                                  // <button>you Following ..</button>
                                  <p style={{ display: "inline" }} onClick={() => { run_effect(!effect_) }}><Follow my_id={project.owner._id} back={false} un_follow={true} /></p>

                                ) : (
                                  // Default follow button if neither isFollower nor isFollowing is true
                                  <p onClick={() => { run_effect(!effect_) }}> <Follow my_id={project.owner._id} /></p>

                                )


                              ) : (
                                // Default follow button while follow status is loading
                                // <Follow my_id={project.owner._id} />
                                <p>Loading ....</p>
                              )

                            ) : (
                              <p>it's You</p>
                            )) : (
                              <NavLink className="text-active-blue " to="/login">go to login</NavLink>

                            )
                          }


                        </div>


                        {/* <button value={project.owner._id} onClick={(e)=>{alert(e.target.value)}}>+ Follow</button> */}


                      </div>
                    </NavLink>



                  </div>

                </div>




                {/* this is another div without css */}


              </>
            ))

          ) : (
            <>

              <FallingLines
                // color="#4fa94d"
                color="black"
                width="200"
                visible={true}
                ariaLabel="falling-circles-loading"
              />

            </>
          )

        }



        {/* <div className='loader_div'>
    <div className='loder'>
      <div>
      
      </div>
    </div>
    <h1>Loading ....</h1>
    </div> */}






      </div>


      {/* <div>{allproject}</div> */}



    </>
  )
}

export default Allproject
