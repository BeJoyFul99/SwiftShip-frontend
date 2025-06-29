"use client";

import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SplitText from "gsap/SplitText";
if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
  gsap.registerPlugin(SplitText);
}
import Image from "next/image";

function Advantages() {
  const splitTextRef = useRef(null);
  const descriptions = [
    {
      title: "Swift and Reliable Shipping",
      content:
        "Experience lightning-fast delivery with our advanced logistics network. Your goods are in safe hands, reaching their destination on time, every time.",
      src: "https://media.gettyimages.com/id/1438199917/photo/delivery-white-van-in-manhattan-around-times-square-area.jpg?s=2048x2048&w=gi&k=20&c=r-rZqQXq5HYlhpL0G0MBtxSXGq4VmIM0OwcpmYOybp4=",
      alt: "swift shipping",
    },
    {
      title: "Global Reach, Local Touch",
      alt: "global reach",
      content:
        "We connect the world by receiving and shipping globally. Reaching over 200 countries, we ensure your goods are delivered.",
      src: "https://media.gettyimages.com/id/809822234/photo/city-hall-in-antwerp.jpg?s=2048x2048&w=gi&k=20&c=86A9Aaz56wThH9A0c75lsYkJzfmE0lVZDO_97R_Jt0A=",
    },
  ];

  const [currentDescriptionIndex, setCurrentDescriptionIndex] = useState(0);
  const handleDescriptionChange = (index: number) => {
    setCurrentDescriptionIndex(index);
    console.log("Description changed to index:", descriptions[index]);
  };

  useGSAP(
    () => {
      console.log("GSAP effect running for index:", currentDescriptionIndex);
      const splitText = new SplitText(splitTextRef.current, {
        type: "words",
       
        wordsClass: "word",
      });

      gsap.fromTo(
        splitText.words,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "back",
          stagger: 0.1,
        }
      );

      return () => {
        splitText.revert();
      };
    },
    { scope: splitTextRef, dependencies: [currentDescriptionIndex] } // Ensure the effect runs when the index changes
  );

  return (
    <div className="advantages md:pt-0 md:p-10 flex flex-col items-start justify-center gap-2">
      <div className="relative grid grid-rows-1 grid-cols-2 gap-4 mb-12">
        {/* we are fast */}
        {descriptions.map((description, index) => (
          <Image
            key={index}
            width={350}
            height={300}
            className={
              "rounded-lg hover:scale-105 transition-transform duration-300 hover:cursor-pointer" +
              (currentDescriptionIndex === index
                ? " border-2 border-orange-500"
                : "")
            }
            alt={description["alt"]}
            onClick={() => handleDescriptionChange(index)}
            objectFit="cover"
            src={description["src"]}
          ></Image>
        ))}
      </div>
      <div ref={splitTextRef}>
        <h2 className="text-lg/5 md:text-4xl/10 font-bold text-wrap text-[var(--foreground)]/80">
          {descriptions[currentDescriptionIndex]["title"]} ---
          <span className="text-[var(--foreground-half)]">
            {" "}
            {descriptions[currentDescriptionIndex]["content"]}
          </span>
        </h2>
      </div>
    </div>
  );
}

export default Advantages;
