import Advantages from "@/components/landing/Advantages";
import Features from "@/components/landing/Features";
import ContainerAnimation from "@/components/landing/ContainerAnimation";
import Howitwokrs from "@/components/landing/Howitwokrs";
export default function Home() {
  return (
    <main className="w-full h-full min-h-screen ">
      <section id="landing" className="w-full h-full p-3 pt-3 relative">
        <div className="content p-5 landing-content-bg relative rounded-lg shadow-lg w-full h-full flex items-center justify-center  md:min-h-[860px] flex-col gap-6 bg-cover bg-center bg-no-repeat ">
          <h1
            className="text-[2.5rem] md:text-[3.5rem] mt-36 md:mt-45 font-bold mb-4 text-[var(--snow-white)] text-center tracking-wide"
            style={{ fontFamily: "var(--font-shippori-antique-b1)" }}
          >
            Welcome to{" "}
            <span
              className="glass-text from-white to-orange-300 "
              style={{
                fontFamily: "var(--font-shippori-antique-b1)",
              }}
            >
              SwiftShip
            </span>
          </h1>
          <p
            className="text-sm md:text-lg mt-[1.25rem] md:mt-[5rem] text-center text-white mb-6 w-10/12 md:w-6/12 leading-relaxed"
            style={{ fontFamily: "var(--font-shippori-antique)" }}
          >
            Revolutionizing global freight logistics. <br />
            Fast, reliable, and tailored shipping solutions <br />
            designed to meet your unique needs.
          </p>
          {/* Call-to-Action */}
          <button
            className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-700 text-white rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300"
            style={{ fontFamily: "var(--font-shippori-antique)" }}
          >
            Get Started
          </button>
        </div>
      </section>
      {/* reasons why SwiftShip is the best choice for your shipping needs. */}
      <section id="advantages" className="w-full">
        <div className="container mx-auto px-4 py-20 flex gap-8 flex-col lg:flex-row">
          <h2 className="section-header mx-auto md:mx-0 min-w-fit h-max text-(var(--foreground)) ">
            Why Choose{" "}
            <span className=" glass-text from-[var(--foreground)]/40 to-orange-300">
              SwiftShip
            </span>{" "}
            ?
          </h2>
          <Advantages />
        </div>
      </section>
      <section
        id="features"
        className="relative w-full before:left-[50%] before:-translate-x-[50%] before:absolute before:top-0 before:w-11/12 before:h-[0.86px] before:bg-[var(--foreground)]/20 before:rounded-full  "
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
        className="w-full h-full my-5 py-17 px-2 md:py-20 md:px-10 bg-foreground/3"
      >
        <Howitwokrs />
      </section>
    </main>
  );
}
