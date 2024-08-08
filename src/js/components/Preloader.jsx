import React, { useEffect } from 'react'

import gsap from "gsap";

// Declare a general timeline to use in all the animation functions.

const tl = gsap.timeline();

const mobileLanding = () => {
    window.innerWidth < 763 &&
      tl.from(".landing__main2", {
        duration: 1,
        delay: 0,
        opacity: 0,
        y: -40,
        ease: "expo.easeOut",
      });
};

// Preloader Animation
const preLoaderAnim = () => {
  tl.to("body", {
    duration: 0.1,
    css: { overflowY: "hidden" },
    ease: "power3.inOut",
  })
    .to(".texts-container", {
      duration: 0,
      opacity: 1,
      ease: "Power3.easeOut",
    })
    .from(".texts-container span", {
      duration: 1.5,
      delay: 1,
      y: 70,
      skewY: 10,
      stagger: 0.4,
      ease: "Power3.easeOut",
    })
    .to(".texts-container span", {
      duration: 1,
      y: 70,
      skewY: -20,
      stagger: 0.2,
      ease: "Power3.easeOut",
    })
    .to("body", {
      duration: 1.1,
      css: { overflowY: "scroll" },
      ease: "power3.inOut",
    })
    .to(
      ".preloader",
      {
        duration: 1.5,
        height: "0vh",
        ease: "Power3.easeOut",
        onComplete: mobileLanding(),
      },
      "-=2"
    )
    .to(".preloader", {
      duration: 0,
      css: { display: "none" },
    });
};

const preLoaderAnim2 = () => {
    tl.to("body", {
      duration: 0.1,
      css: { overflowY: "hidden" },
      ease: "power3.inOut",
    })
    .to(".title-container", {
        duration: 0,
        opacity: 1,
        ease: "Power3.easeOut",
      })
      .from(".title-container span", {
        duration: 0.5,
        delay: 0.5,
        y: 70,
        skewY: 10,
        stagger: 0.4,
        ease: "Power3.easeOut",
      })
      .to(".texts-container", {
        duration: 0,
        opacity: 1,
        ease: "Power3.easeOut",
      })
      .from(".texts-container span", {
        duration: 1,
        delay: 1,
        y: 100,
        skewY: 10,
        stagger: 0.4,
        ease: "Power3.easeOut",
      })
      .to(".texts-container span", {
        duration: 1,
        y: 100,
        skewY: -20,
        stagger: 0.2,
        ease: "Power3.easeOut",
      })
      .to(".title-container span", {
        duration: 1,
        opacity: 0,
        ease: "Power3.easeOut",
      })
      .to("body", {
        duration: 1,
        css: { overflowY: "scroll" },
        ease: "power3.inOut",
      })
      .to(
        ".preloader",
        {
          duration: 1.5,
          height: "0vh",
          ease: "Power3.easeOut",
          onComplete: mobileLanding(),
        },
        "-=2"
      )
      .to(".preloader", {
        duration: 0,
        css: { display: "none" },
      });
  };


const Preloader = () => {

    useEffect(() => {
        preLoaderAnim2()

    },[])

    return (
        <div className='preloader h-screen w-screen bg-darker text-white fixed top-0 left-0 z-40 flex items-center justify-center overflow-hidden flex-col'>
            <div className='title-container flex items-center justify-center md:justify-between h-14 md:h-16 w-[400px] text-4xl overflow-hidden text-white'>
                <span>Tomás Villarreal</span>
            </div>
            <div className='texts-container flex flex-col md:flex-row items-center justify-between h-18 md:h-16 w-[500px] text-lg md:text-2xl overflow-hidden text-white'>
                <span>Developer,   </span>
                <span>Engineer,   </span>
                <span>Creative. </span>
            </div>
        </div>
    )
}

export default Preloader