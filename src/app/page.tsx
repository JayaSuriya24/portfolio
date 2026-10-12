import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SectionMark from "@/components/SectionMark";

const sections = [About, Experience, Projects, Skills, Education, Contact];

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main" className="overflow-x-clip">
        <Hero />
        {sections.map((Component, index) => (
          // isolate: the numeral sits behind the section's content but above
          // the fixed backdrop.
          <div key={index} className="relative isolate">
            <SectionMark index={index + 1} />
            <Component />
          </div>
        ))}
      </main>
      <Footer />
    </>
  );
}
