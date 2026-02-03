"use client";

import { allCocktails } from "@/constants";
import { useGSAP } from "@gsap/react";
import React from "react";
import { gsap } from "gsap";
import { SplitText, ScrollTrigger } from "gsap/all";

gsap.registerPlugin(SplitText, ScrollTrigger);

const Menu = () => {
  const contentRef = React.useRef<HTMLDivElement | null>(null);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const totalCocktails = allCocktails.length;

  const goToSlider = (index: number) => {
    const newIndex = (index + totalCocktails) % totalCocktails;

    setCurrentIndex(newIndex);
  };

  const getCocktailAt = (indexOffset: number) => {
    return allCocktails[(currentIndex + indexOffset + totalCocktails) % totalCocktails];
  };

  const currentCocktail = getCocktailAt(0);
  const prevCocktail = getCocktailAt(-1);
  const nextCocktail = getCocktailAt(1);

  useGSAP(() => {
    const detailsSplit = SplitText.create(".details p", { type: "lines" });

    gsap.fromTo(
      "#title",
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 1,
        ease: "power1.out",
      },
    );
    gsap.fromTo(
      ".cocktail img",
      {
        opacity: 0,
        xPercent: -100,
      },
      {
        opacity: 1,
        xPercent: 0,
        duration: 1,
        ease: "power1.out",
      },
    );

    gsap.fromTo(
      ".details h2",
      {
        opacity: 0,
        yPercent: 100,
      },
      {
        opacity: 1,
        yPercent: 0,
        duration: 1,
        ease: "power2.out",
      },
    );
    gsap.fromTo(
      detailsSplit.lines,
      {
        opacity: 0,
        yPercent: 100,
      },
      {
        opacity: 1,
        yPercent: 0,
        duration: 1,
        ease: "power1.out",
        stagger: 0.1,
      },
    );

    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#menu",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      })
      .to("#m-right-leaf", { y: 500 }, 0)
      .to("#m-left-leaf", { y: 200 }, 0);

    return () => {
      detailsSplit.revert();
      gsap.killTweensOf("#m-right-leaf");
      gsap.killTweensOf("#m-left-leaf");
    };
  }, [currentIndex]);

  return (
    <section id="menu" aria-labelledby="menu-heading" className="overflow-hidden">
      <img src="/images/slider-left-leaf.png" alt="l-leaf" id="m-left-leaf" />
      <img src="/images/slider-right-leaf.png" alt="r-leaf" id="m-right-leaf" />

      <h2 className="" id="menu-heading"></h2>
      <nav className="cocktail-tabs" aria-labelledby="Cocktail Nav">
        {allCocktails.map((cocktail, index) => {
          const isActive = currentIndex === index;
          return (
            <button
              key={cocktail.id}
              onClick={() => goToSlider(index)}
              className={
                isActive ? "border-b border-white text-white" : "border-white/50 text-white/50"
              }
            >
              {cocktail.name}
            </button>
          );
        })}
      </nav>
      <div className="content">
        <div className="arrows h-full">
          <button
            className="flex-center flex gap-2 text-left"
            onClick={() => goToSlider(currentIndex - 1)}
          >
            <img src="/images/right-arrow.png" alt="right-arrow" aria-hidden />
            <span>{prevCocktail.name}</span>
          </button>
          <button
            className="flex-center flex gap-2 text-left"
            onClick={() => goToSlider(currentIndex + 1)}
          >
            <img src="/images/left-arrow.png" alt="right-arrow" aria-hidden />
            <span>{nextCocktail.name}</span>
          </button>
        </div>

        <div className="cocktail">
          <img src={currentCocktail.image} alt="" className="object-contain" />
        </div>

        <div className="recipe">
          <div ref={contentRef} className="info">
            <p>Recipe for:</p>
            <p id="title">{currentCocktail.name}</p>
          </div>
          <div className="details">
            <h2>{currentCocktail.title}</h2>
            <p>{currentCocktail.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Menu;
