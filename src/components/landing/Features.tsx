import React from "react";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";

function Features() {
  return (
    <>
      <Carousel>
        <CarouselContent>
          <CarouselItem>
            <div className="flex flex-col items-center justify-center p-6">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Global Reach</h2>
              <p className="text-md md:text-xl text-center text-foreground/70 mb-6">
                SwiftShip connects you to over 200 countries, ensuring your
                goods reach their destination safely and on time.
              </p>
            </div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </>
  );
}

export default Features;
