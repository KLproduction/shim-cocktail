import { useGSAP } from "@gsap/react";
import { ScrollTrigger, SplitText } from "gsap/all";
import gsap from "gsap";
import Hero from "@/components/Hero";
import Cocktails from "@/components/Cocktails";

gsap.registerPlugin(ScrollTrigger, SplitText);
export default function Home() {
  return (
    <main className="flex-center flex-col">
      <Hero />
      <Cocktails />
    </main>
  );
}
