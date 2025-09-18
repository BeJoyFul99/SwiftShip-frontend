import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      new URL(
        "https://media.gettyimages.com/id/1438199917/photo/delivery-white-van-in-manhattan-around-times-square-area.jpg?s=2048x2048&w=gi&k=20&c=r-rZqQXq5HYlhpL0G0MBtxSXGq4VmIM0OwcpmYOybp4="
      ),
      new URL(
        "https://media.gettyimages.com/id/809822234/photo/city-hall-in-antwerp.jpg?s=2048x2048&w=gi&k=20&c=86A9Aaz56wThH9A0c75lsYkJzfmE0lVZDO_97R_Jt0A="
      ),
      new URL(
        "https://banner2.cleanpng.com/20181201/aiz/kisspng-airplane-airbus-clip-art-flight-aircraft-1713915467065.webp"
      ),
    
    ],
  },
};

export default nextConfig;
