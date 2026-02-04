import { useGSAP } from "@gsap/react";
import { ScrollTrigger, SplitText } from "gsap/all";
import gsap from "gsap";
import Hero from "@/components/Hero";
import Cocktails from "@/components/Cocktails";
import About from "@/components/About";
import Art from "@/components/Art";
import Menu from "@/components/Menu";
import Contact from "@/components/Contact";

gsap.registerPlugin(ScrollTrigger, SplitText);
export default function Home() {
  return (
    <main className="flex-center flex-col">
      <Hero />
      <Cocktails />
      <About />
      <div className="mb-24">
        <Art />
      </div>
      <Menu />

      <Contact />
    </main>
  );
}
