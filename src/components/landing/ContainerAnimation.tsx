"use client";
import React, { useRef } from "react";
import containerSvg from "./../../../public/container.svg";
import Image from "next/image";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}
function ContainerAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (containerRef.current) {
        const st = ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top 55%",
          end: "bottom bottom",
          scrub: true,
          toggleActions: "play none none reverse",
          onEnter: () => {
            gsap.fromTo(
              ".before-container",
              { opacity: 0, duration: 1, left: "50%", translateX: "-50%" },
              { opacity: 1, duration: 1 }
            );
            gsap.to(".before-container", {
              opacity: 1,
              duration: 1.5,
              left: "-150%",
              translateX: "0",
              delay: 1.85,
              ease: "power3.in",
            });
            gsap.fromTo(
              ".container-svg",
              { display: "block", duration: 1, left: "110%" },
              {
                opacity: 1,
                duration: 3.45,
                left: "-150%",
                ease: "power3.in",
              }
            );
            gsap.fromTo(
              ".after-container",
              {
                opacity: 0,
                duration: 1,
              },
              {
                opacity: 1,
                duration: 1,
                delay: 2.55,
              }
            );
          },
        });

        return () => {
          st.kill();
        };
      }
    },
    { scope: containerRef }
  );
  return (
    <div
      className="w-full h-full flex items-center justify-center relative overflow-hidden"
      ref={containerRef}
    >
      <h1 className="before-container z-10 absolute min-w-max  text-2xl md:text-4xl/12 font-bold text-center mb-8 opacity-0">
        Connecnting the World <br />{" "}
        <span className=" text-orange-500">Through Reliable,Efficient</span>{" "}
        <br /> Shipping Solutions.
      </h1>
      <Image
        src={containerSvg.src}
        alt="Container Animation"
        className="container-svg hidden z-20 h-auto absolute top-[calc(100%-clamp(510px,60vw,690px))] -translate-y-[50%] w-[90vw] min-w-[500px] max-w-[840px]"
        width={680}
        height={680}
        objectFit="contain"
      />
      <div className="after-container absolute opacity-0">
        <div className="icons"></div>
        <h1 className="text-2xl md:text-4xl/15 font-bold text-center mb-8 ">
          <span className="text-orange-500">Innovative</span> Logistics That
          Empower <br /> Global Trade and Keep Your Cargo <br />{" "}
          <span className="text-orange-500/80">Moving Forward</span>
        </h1>
      </div>
    </div>
  );
}

export default ContainerAnimation;
