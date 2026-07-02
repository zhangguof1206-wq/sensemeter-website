"use client";

import { Children, type ReactNode, useRef } from "react";

type CardCarouselProps = {
  ariaLabel: string;
  children: ReactNode;
  autoPlay?: boolean;
};

export function CardCarousel({ ariaLabel, children, autoPlay = false }: CardCarouselProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const items = Children.toArray(children);
  const itemCount = items.length;

  const scroll = (direction: -1 | 1) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const maxLeft = scroller.scrollWidth - scroller.clientWidth;
    if (maxLeft <= 0) return;

    const amount = Math.max(scroller.clientWidth * 0.9, 280);

    if (direction > 0) {
      if (scroller.scrollLeft >= maxLeft - 8) {
        scroller.scrollTo({ left: 0, behavior: "smooth" });
        return;
      }

      scroller.scrollTo({ left: Math.min(scroller.scrollLeft + amount, maxLeft), behavior: "smooth" });
      return;
    }

    if (scroller.scrollLeft <= 8) {
      scroller.scrollTo({ left: maxLeft, behavior: "smooth" });
      return;
    }

    scroller.scrollTo({ left: Math.max(scroller.scrollLeft - amount, 0), behavior: "smooth" });
  };

  if (autoPlay) {
    return (
      <div className="carousel-marquee relative" aria-label={ariaLabel}>
        <div className="carousel-marquee-track">
          {[...items, ...items].map((child, index) => (
            <div className="carousel-marquee-item" aria-hidden={index >= itemCount} key={index}>
              {child}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative" aria-label={ariaLabel}>
      {itemCount > 3 ? (
        <div className="mb-4 flex justify-end gap-2">
          <button
            className="grid h-10 w-10 place-items-center rounded border border-line bg-white text-ink shadow-sm transition hover:border-accent hover:text-accent focus:outline-none focus:ring-4 focus:ring-accent/20"
            type="button"
            aria-label="Previous cards"
            onClick={() => scroll(-1)}
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <button
            className="grid h-10 w-10 place-items-center rounded border border-line bg-white text-ink shadow-sm transition hover:border-accent hover:text-accent focus:outline-none focus:ring-4 focus:ring-accent/20"
            type="button"
            aria-label="Next cards"
            onClick={() => scroll(1)}
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>
      ) : null}
      <div
        ref={scrollerRef}
        className="no-scrollbar grid auto-cols-[minmax(260px,1fr)] grid-flow-col gap-6 overflow-x-auto scroll-smooth pb-3 snap-x snap-mandatory md:auto-cols-[calc((100%-3rem)/3)]"
      >
        {items.map((child, index) => (
          <div className="snap-start" key={index}>{child}</div>
        ))}
      </div>
    </div>
  );
}