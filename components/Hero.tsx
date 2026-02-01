"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger, SplitText } from "gsap/all";
import { useMediaQuery } from "react-responsive";
import { cn } from "@/lib/utils";

gsap.registerPlugin(SplitText, ScrollTrigger);

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const videoWrapRef = useRef<HTMLElement | null>(null);
  const videoPinRef = useRef<HTMLDivElement | null>(null);

  const isMobile = useMediaQuery({ maxWidth: 767 });

  useGSAP(
    () => {
      // 文字動畫（你原本）
      const heroSplit = new SplitText(".title", { type: "chars, words" });
      const papraSplit = new SplitText(".subtitle", { type: "lines" });

      heroSplit.chars.forEach((char) => char.classList.add("text-gradient"));

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
        .to(".right-leaf", { y: 500 }, 0)
        .to(".left-leaf", { y: -200 }, 0);

      // video scrub
      const video = videoRef.current;
      const wrap = videoWrapRef.current;
      const pin = videoPinRef.current;
      if (!video || !wrap || !pin) return;

      const start = isMobile ? "top 50%" : "top top";
      const end = isMobile ? "120% top" : "bottom top";

      // 確保由 0 開始，並交俾 scroll 控制
      video.pause();
      video.currentTime = 0;

      const init = () => {
        const duration = video.duration;
        if (!duration || Number.isNaN(duration)) return;

        gsap.to(video, {
          currentTime: duration,
          ease: "none",
          scrollTrigger: {
            trigger: wrap,
            start,
            end,
            scrub: true,
            pin,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            // markers: true, // debug 用
          },
        });

        ScrollTrigger.refresh();
      };

      // 避免錯過 loadedmetadata
      if (video.readyState >= 1) {
        init();
      } else {
        video.addEventListener("loadedmetadata", init, { once: true });
      }

      return () => {
        heroSplit.revert();
        papraSplit.revert();
        ScrollTrigger.getAll().forEach((st) => st.kill());
      };
    },
    { dependencies: [isMobile] },
  );

  return (
    <>
      <section id="hero" className="noisy relative">
        <h1 className="title">MOJITO</h1>

        <img src="/images/hero-left-leaf.png" alt="" className="left-leaf" />
        <img src="/images/hero-right-leaf.png" alt="" className="right-leaf" />

        <div className="body">
          <div className="content">
            <div className="hidden space-y-5 md:block">
              <p>Cool. Crisp. Classic.</p>
              <p className="subtitle">
                Sip the Spirit <br />
                of Summer
              </p>
            </div>

            <div className="view-cocktails">
              <p className="subtitle">
                Every cocktail on our menu is blend of passion, creativity, and quality ingredients.
                We take pride in crafting a diverse selection of cocktails that reflect the essence
                of summer.
              </p>
              <a href="#cocktails">View Cocktails</a>
            </div>
          </div>
        </div>
      </section>

      {/* 這段提供「可捲動距離」 */}
      <section ref={videoWrapRef} className="absolute inset-0 min-h-screen">
        {/* pin 的容器在 flow 裏面，穩定 */}
        <div ref={videoPinRef} className="sticky top-0 h-screen w-full overflow-hidden">
          <video
            ref={videoRef}
            src="/videos/output.mp4"
            muted
            playsInline
            preload="auto"
            className="absolute top-0 left-0 h-1/2 w-full object-cover object-bottom md:top-auto md:bottom-0 md:h-[80%] md:object-contain"
          />
        </div>
      </section>
    </>
  );
}
