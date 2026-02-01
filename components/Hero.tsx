"use client";

import { useGSAP } from "@gsap/react";
import React from "react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";

gsap.registerPlugin(SplitText, ScrollTrigger);

const Hero = () => {
  useGSAP(() => {
    const heroSplit = new SplitText(".title", { type: "chars, words" });
    const papraSplit = new SplitText(".subtitle", { type: "lines" });

    heroSplit.chars.forEach((char, i) => {
      char.classList.add("text-gradient");
    });
    gsap.from(heroSplit.chars, {
      yPercent: 100,
      duration: 1.8,
      ease: "expo.out",
      stagger: 0.08,
    });

    gsap.from(papraSplit.lines, {
      yPercent: 100,
      duration: 1.8,
      opacity: 0,
      ease: "expo.out",
      stagger: 0.06,
      delay: 0.8,
    });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      })
      .to(
        ".right-leaf",
        {
          y: 500,
        },
        0,
      )
      .to(
        ".left-leaf",
        {
          y: -200,
        },
        0,
      );
  }, []);
  return (
    <>
      <section id="hero" className="noisy">
        <h1 className="title">MOJITO</h1>

        <img src="/images/hero-left-leaf.png" alt="" className="left-leaf" />
        <img src="/images/hero-right-leaf.png" alt="" className="right-leaf" />
        <div className="body">
          <div className="content">
            <div className="space-y-5 hidden md:block">
              <p>Cool. Crisp. Classic.</p>
              <p className="subtitle">
                Sip the Spirit <br />
                of Summer
              </p>
            </div>

            <div className="view-cocktails">
              <p className="subtitle">
                Every cocktail on our menu is blend of passion, creativity, and
                quality ingredients. We take pride in crafting a diverse
                selection of cocktails that reflect the essence of summer.
              </p>
              <a href="#cocktails">View Cocktails</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
