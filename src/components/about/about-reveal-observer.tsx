"use client";

import { useEffect } from "react";

const revealSelector = "[data-about-reveal]";

export function AboutRevealObserver() {
  useEffect(() => {
    const root = document.documentElement;
    const elements = Array.from(document.querySelectorAll<HTMLElement>(revealSelector));

    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -7% 0px", threshold: 0.08 }
    );

    elements.forEach((element) => observer.observe(element));
    root.classList.add("about-reveal-ready");

    return () => {
      observer.disconnect();
      root.classList.remove("about-reveal-ready");
    };
  }, []);

  return null;
}
