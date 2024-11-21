import { useEffect, useLayoutEffect, useRef, useState } from 'react'




import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LocomotiveScroll from 'locomotive-scroll';
import Merndiv from './Merndiv';
import Allproject from './Allproject';
import Footer from './Footer';



function Hero() {


    
  gsap.registerPlugin(ScrollTrigger);


  const scrollRef = useRef(null);
 
 //  useLayoutEffect(()=>{
 
 //   const scroll = new LocomotiveScroll({
 //     el: scrollRef.current,
 //     smooth: true,
 //     // direction: 'horizontal',
 //   });
 
 //   return()=>{
 //     scroll.destroy();
 //   }
 
 
 //  }, []) ;
 
 
 
 
 
   useGSAP(()=>{
 
 
  
     
     function cursoreffect(){
       var page1contant = document.querySelector("#page1_contant");
       var cursor = document.querySelector("#cursor");
       
       
       page1contant.addEventListener("mousemove", function(e){
           // cursor.style.left = e.clientX + "px";
           // cursor.style.top = e.clientY + "px";
       
           gsap.to(cursor , {
               x : e.clientX,
               y : e.clientY,
           })
       
       })
 
       
       page1contant.addEventListener("mouseenter", function(e){
           // cursor.style.left = e.clientX + "px";
           // cursor.style.top = e.clientY + "px";
       
           gsap.to(cursor , {
              scale :1  , 
              opacity :1
           })
       
       })
       page1contant.addEventListener("mouseleave", function(e){
           // cursor.style.left = e.clientX + "px";
           // cursor.style.top = e.clientY + "px";
       
           gsap.to(cursor , {
             scale:0 , 
             opacity :0
           })
       
       })
   
   
   }
   
   // cursoreffect();
   
   
   
   var tl = gsap.timeline();
   
   tl.from("#page1_contant > h1 span",{
       
       y : 200 , 
       opasity : 0,
       stagger : 0.1 ,
       duration : 0.5
   })
   
   
   
   var ti2 = gsap.timeline({scrollTrigger : {
     trigger : '#page2',
     // markers : true ,
     start : 'top 50%',
     end : 'top 50%',
     scrub :1,
     pin : true,
 
     // pinType : 'top',
     pinSpacing : true,
     // ease : 'power4.inOut'
  }})
 
 
    
     // ti2.from('#page2_big_text', {y: "50%", opacity: 0 },)
     // ti2.from('.text_rigth', {x: "50%", opacity: 0   }, "A") ;
     // ti2.from('.text_left', {x: "-50%", opacity: 0   }, "A") ;
 
     // ti2.to('.text_rigth', {y: "-50%",})
 
   
 
 
 
 
   })
 
 
 


  return (
     <>
     

     
  <div ref={scrollRef} id="main" className='scroll-container'>
         <div id="page1">

            {/* <div id="cursor">Play Real</div> */}

            <video src="RJ-BALL-BLUE-ORANGE-scaled.webm" autoplay loop muted></video>
           
            {/* <img src="abcd.gif" alt="">  */}
           
            <div id="page1_contant">

              

                <p className="page1_p">◀ showcasing skills <span>with</span> ↴ ▶</p>

                <h1>
                     {/* <span>r</span>
                    <span>e</span>
                    <span>j</span>
                    <span>o</span>
                    <span>u</span>
                    <span>i</span>
                    <span>c</span>
                    <span>e</span>  */}


                  {/* <span>p</span>
                    <span>o</span>
                    <span>r</span>
                    <span>t</span>
                    <span>f</span>
                    <span>o</span>
                    <span>l</span>
                    <span>i</span>
                    <span>o</span>  */}

                    
                    {/* <span>c</span>
                    <span>e</span>  */}


                    <span>s</span>
                    <span>k</span>
                    <span>i</span>
                    <span>l</span>
                    <span>l</span>
                    <span>f</span>
                    <span>o</span>
                    <span>l</span>
                    <span>i</span>
                    <span>o</span>

                </h1>

            </div>
         </div>

         <div data-scroll data-scroll-speed={5} id="page2">


            <div>
                
                <div><p>Showcase Your Details</p>
                <p>PROGRAMING |  DESIGN </p></div>


                <p  id="page2_big_text">

                  {/* <span className="text_rigth">  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;We are a venture firm and digital agency. Our </span>

                  <span className="text_left"> mission is to transform founders' visions into </span>

                  <span className="text_rigth"> remarkable brands. Choose traditional </span>

                  <span className="text_left"> compensation or an equity offset through our </span>

                  <span className="text_rigth"> Venture Model — your vision, your decision.</span> */}

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  "A platform for tech enthusiasts to create profiles, showcase their skills, projects, and achievements, and follow others to build a tech network. Connect with like-minded professionals and grow your tech community."

                  </p></div>

         </div>
    </div>


<Merndiv  />


{/* <Allproject /> */}


<Allproject />

  {/* <div className="second"></div> */}
{/* <Footer /> */}

     
     </>
  )
}

export default Hero
