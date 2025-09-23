import Advantages from "@/components/landing/Advantages";
import Features from "@/components/landing/Features";
import ContainerAnimation from "@/components/landing/ContainerAnimation";
import Howitwokrs from "@/components/landing/Howitwokrs";
import { FaLocationDot } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa";

export default function Home() {
  return (
    <main className="w-full h-full min-h-screen bg-background text-foreground">
      <section id="landing" className="w-full h-full p-3 pt-3 relative">
        <div className="content h-[640px] p-5 landing-content-bg relative rounded-lg shadow-lg w-full md:h-full flex items-center justify-center md:min-h-[860px] flex-col gap-6 bg-cover bg-center bg-no-repeat">
          <h1
            className="blur-bg px-5 py-2 rounded-4xl text-[1.5rem] md:text-[3.5rem] mt-36 md:mt-45 font-bold mb-4 text-foreground text-center tracking-wide"
            style={{ fontFamily: "var(--font-shippori-antique-b1)" }}
          >
            Welcome to{" "}
            <span
              className="glass-text from-foreground to-primary"
              style={{
                fontFamily: "var(--font-shippori-antique-b1)",
              }}
            >
              SwiftShip
            </span>
          </h1>
          <p
            className="text-sm md:text-lg mt-[1.25rem] md:mt-[5rem] text-center text-foreground mb-6 w-10/12 md:w-6/12 leading-relaxed"
            style={{ fontFamily: "var(--font-shippori-antique)" }}
          >
            Revolutionizing global freight logistics. <br />
            Fast, reliable, and tailored shipping solutions <br />
            designed to meet your unique needs.
          </p>
          {/* Call-to-Action */}
          <button
            className="px-8 py-3 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300"
            style={{ fontFamily: "var(--font-shippori-antique)" }}
          >
            Get Started
          </button>
        </div>
      </section>
      {/* reasons why SwiftShip is the best choice for your shipping needs. */}
      <section id="advantages" className="w-full">
        <div className="container mx-auto px-4 py-20 flex gap-8 flex-col lg:flex-row">
          <h2 className="section-header mx-auto md:mx-0 min-w-fit h-max text-foreground">
            Why Choose{" "}
            <span className="glass-text from-foreground/40 to-primary">
              SwiftShip
            </span>{" "}
            ?
          </h2>
          <Advantages />
        </div>
      </section>
      <section
        id="features"
        className="relative w-full before:left-[50%] before:-translate-x-[50%] before:absolute before:top-0 before:w-11/12 before:h-[0.86px] before:bg-foreground/20 before:rounded-full"
      >
        <Features />
      </section>
      <section
        id="connecting-the-world"
        className="w-full h-[600px] my-7 p-2 md:p-7 relative md:h-[800px]"
      >
        <ContainerAnimation />
      </section>
      <section
        id="how-it-works"
        className="w-full h-max mt-5 mb-10 py-17 px-2 md:py-20 md:px-10 bg-foreground/3"
      >
        <Howitwokrs />
      </section>
      <section
        id="metrics"
        className="mx-8 h-max grid grid-cols-1 lg:grid-cols-2 py-10"
      >
        <div className="grid grid-rows-2 grid-cols-1">
          <div className="metric-1 min-h-[350] justify-between flex flex-col items-between py-10 px-5 border border-foreground/20 border-x-0">
            <span className="border w-fit rounded-4xl px-3 py-1 border-foreground/40 font-semibold text-foreground text-xl">
              Key Metrics
            </span>
            <div>
              <h2 className="mb-7 text-4xl font-bold">Define Our Excellence</h2>
              <p className="text-foreground/80 text-base mt-auto h-full">
                We believe finanacial growth begins with trust. <br /> That
                &apos why we prioritize world-class{" "}
              </p>
            </div>
          </div>
          <div className="metric-3 border-r border-b border-foreground/20  flex flex-col justify-end p-10 gap-5">
            <span className="text-6xl lg:text-8xl font-bold">99%</span>
            <p className="text-foreground/80 text-lg">
              Shipment arrive on time
            </p>
          </div>
        </div>
        <div className="grid grid-row-2 lg:grid-rows-3 grid-cols-1">
          <div className="metric-2 border p-10 border-foreground/20 border-r-0 flex flex-col justify-center lg:row-span-2 gap-5 ">
            <h1 className="text-6xl lg:text-8xl font-bold mt-auto">
              1.5 million
            </h1>
            <p className="text-foreground/80 text-sm lg:text-base mt-auto ">
              handled annually, connecting <br /> businesses worldwide
            </p>
          </div>

          <div className="metric-4 border-b border-foreground/20 flex flex-col justify-end p-10 gap-5 border-r lg:border-r-0">
            <span className="text-5xl lg:text-8xl font-bold mt-auto">100%</span>
            <p className="text-foreground/80 text-sm lg:text-base lg:w-6/12">
              Serving 100+ countries,providing global coverage for all your
              shipping needs.
            </p>
          </div>
        </div>
      </section>
      <footer className="w-full h-fit bg-background md:p-20 p-10 border-t border-border">
        <div className="mt-10 flex flex-wrap gap-5 justify-between items-end border-b border-border pb-10 md:pb-20">
          <h1 className="text-xl md:text-4xl lg:text-6xl text-foreground">
            Ready to Ship with <br />
            Confidence?
          </h1>{" "}
          <div className="location w-full md:w-max flex gap-3 items-center px-7 py-4 rounded-full bg-muted/50 border border-border">
            <FaLocationDot className="text-2xl text-primary" />
            <p className="text-sm md:text-xl text-muted-foreground font-light">
              Search Location
            </p>
            <span className="text-sm md:text-xl text-foreground">Canada</span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <button className="group w-full md:w-max text-xl px-8 py-3 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-transform duration-300 flex items-center justify-center gap-2">
            Request A Quote{" "}
            <FaArrowRight className="transition group-hover:translate-x-3.5" />
          </button>
        </div>

        {/* company info */}
        <div className="text-foreground p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* <!-- Head Office --> */}
            <div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">Head office</h3>
              <p className="text-muted-foreground">SchnellTransport AG</p>
              <p className="text-muted-foreground">Frachtweg 15</p>
              <p className="text-muted-foreground">10115 Berlin</p>
              <p className="text-muted-foreground">Deutschland</p>
            </div>

            {/* <!-- Postal & Visitor Address --> */}
            <div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">
                Postal & Visitor address
              </h3>
              <p className="text-muted-foreground">SchnellTransport AG</p>
              <p className="text-muted-foreground">Frachtweg 15</p>
              <p className="text-muted-foreground">10115 Berlin</p>
              <p className="text-muted-foreground">Deutschland</p>
            </div>

            {/* <!-- Email & Phone --> */}
            <div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">Email</h3>
              <p className="text-muted-foreground">{process.env["INFO_EMAIL"]}</p>
              <h3 className="text-lg font-semibold mb-2 mt-4 text-foreground">Phone</h3>
              <p className="text-muted-foreground">{process.env["INFO_PHONE"]}</p>
            </div>
          </div>
        </div>
        <div className="mt-10 text-center text-muted-foreground">
          <p className="text-lg">
            SwiftShip is a leading global freight logistics provider, offering
            fast, reliable, and tailored shipping solutions to meet your unique
            needs.
          </p>
        </div>
        <div className="mt-5 text-center text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} SwiftShip. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
