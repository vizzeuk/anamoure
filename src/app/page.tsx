import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import Bestsellers from "@/components/Bestsellers";
import Experience from "@/components/Experience";
import CTAFinal from "@/components/CTAFinal";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Categories />
      <Bestsellers />
      <CTAFinal />
      <Experience />
      <Footer />
    </>
  );
}
