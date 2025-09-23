"use client";
import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type StackItem = {
  title: string;
  description: string;
  bgImgUrl: string;
};
function Howitwokrs() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const steps: StackItem[] = [
    {
      title: "Send Your Products to Us",
      description:
        "Ship your items to our local warehouse, and we'll handle the rest.",
      bgImgUrl:
        "https://media.gettyimages.com/id/2166223645/photo/person-receiving-delivery-boxes-in-a-home-setting.jpg?s=612x612&w=0&k=20&c=wtd8JC0xbf3vwrSd2yEKOp6OzY11Snbj-VJT5qq9w_U=",
    },
    {
      title: "Claim Your Products",
      description:
        "Claim your parcels and complete the required forms on our platform to prepare them for international shipping.",
      bgImgUrl:
        "https://media.gettyimages.com/id/2203373360/photo/female-customer-contacting-the-online-retailer-while-filling-out-a-return-form.jpg?s=612x612&w=0&k=20&c=5fN2tvnly2SRSgT5jua6KVezvYvZuB3J-bYu38lJZ5g=",
    },
    {
      title: "Secured Payment",
      description:
        "Choose your shipping method and process payments securely through our platform for safe transactions.",
      bgImgUrl:
        "https://media.gettyimages.com/id/1330798400/photo/woman-using-credit-card-for-online-shopping.jpg?s=612x612&w=0&k=20&c=CskgCXnDwljJwN8Fpcmll0pqAqlKG2Pf9HDHADbbas8=",
    },
    {
      title: "Reliable Shipping",
      description:
        "We partner with trusted carriers to ensure your products are shipped safely and efficiently to your doorstep.",
      bgImgUrl:
        "https://media.gettyimages.com/id/1250562171/photo/aerial-view-the-plane-flew-past-a-cargo-ship-that-was-leaving-the-harbor-with-a-truckboat.jpg?s=612x612&w=0&k=20&c=t846PWfMMh_NK1zhF5ByEDvt4WgHx-FAraME6eYOmDM=",
    },
    {
      title: "Receive Your Products",
      description:
        "Track your shipment in real-time and receive your products at your doorstep, hassle-free.",
      bgImgUrl:
        "https://media.gettyimages.com/id/1427686960/photo/woman-walking-home-holding-a-package-and-using-an-app-on-her-cell-phone.jpg?s=612x612&w=0&k=20&c=dG_BgqdfSPLLjw_nyf0EYN61nIwPzTCmBnHcqn1Mv3s=",
    },
  ];

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        const yOffsetPerCard = -15; // Vertical offset between cards in pixels or percentage
        const container = containerRef.current;
        if (!container) return;
        const items = container.querySelectorAll(".stack-item");
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: "top+=320 center",
            end: `bottom+=${items.length * 350} top`,
            scrub: 1,
            pin: true,
          },
        });
        items.forEach((item, index: number) => {
          if (index >= 2) {
            tl.to(items[index - 2], {
              opacity: 0,
              scale: 0.65,
            });
          }
          if (index != 0) {
            const itemDesc =
              items[index - 1].getElementsByClassName("description");
            tl.to(itemDesc, {
              opacity: 0,
            });
          }

          if (index != 0) {
            tl.to(
              items[index - 1],
              {
                opacity: 0.5,
                scale: 0.85,
                yPercent: yOffsetPerCard,
              },
              "-=1"
            );
          }

          tl.fromTo(
            item,
            {
              yPercent: index == 0 ? 0 : 80 * 10,
              opacity: index == 0 ? 1 : 0,
            },
            {
              yPercent: 0,
              opacity: 1,
            },
            "-=1"
          );

          // if (index != 0 && index != items.length - 1) {
          //   tl.to(items[index - 1], {
          //     opacity: 0,
          //   });
          // }
        }, 0);
      });

      return () => ctx.revert();
    },
    { scope: containerRef }
  );
  return (
    <div
      className="flex flex-col relative items-center justify-center w-full h-full "
      ref={containerRef}
    >
      <h1 className="text-xl md:text-4xl/11 top-0 text-foreground font-semibold text-center mb-3 md:w-10/12 max-w-[858px]">
        Shop globally with our streamlined process. Enjoy {" "}
        <span className="text-foreground/35">
          hassle-free international shopping
        </span>
        .
      </h1>
      <p className="text-[11px] md:text-lg top-0 text-muted-foreground text-center md:w-7/12">
        SwiftShip ensures secure payments, reliable shipping, and real-time
        tracking for a seamless global shopping experience.
      </p>

      <div className="stack-group mt-16 mb-5 w-full h-[48vh]  relative flex flex-col justify-center items-center">
        {steps.map((item, index) => (
          <div
            key={index}
            className="stack-item rounded-lg p-5 min-w-[20rem] min-h-[16rem] w-[60vw] h-[50vw] top-0  max-w-[30rem] max-h-[23rem] shadow-xl absolute"
            style={{
              backgroundImage: `url(${item.bgImgUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              zIndex: index,
            }}
          >
            <div className="stack-item-content h-full flex flex-col justify-between">
              <h2 className="text-3xl md:text-4xl font-semibold text-white/80 mb-2">
                0{index + 1}
              </h2>
              <p className="text-base md:text-2xl font-bold  w-fit px-3 py-1 bg-white/20  backdrop-blur-2xl rounded-2xl text-white/80 ">
                {item.title}
              </p>
            </div>
            <span className="description absolute left-2 bottom-0 translate-y-[120%] text-base md:text-lg w-full  font-light text-foreground/85">
              {item.description}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Howitwokrs;
