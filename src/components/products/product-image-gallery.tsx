"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import type { Locale } from "@/data/catalog";

type GallerySlide = { src: string; alt: string; width: number; height: number };
type Props = { slides: GallerySlide[]; locale: Locale };

const INTERVAL_MS = 3000;
const controls = {
  ru: { gallery: "Изображения MDM300", carousel: "карусель", slide: "слайд", pause: "Приостановить показ", play: "Продолжить показ", show: "Показать изображение" },
  en: { gallery: "MDM300 product images", carousel: "carousel", slide: "slide", pause: "Pause slideshow", play: "Play slideshow", show: "Show image" }
};

export function ProductImageGallery({ slides, locale }: Props) {
  const c = controls[locale];
  const id = useId();
  const pointerFocus = useRef(false);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [keyboardFocused, setKeyboardFocused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const activeIndex = slides.length ? index % slides.length : 0;
  const playing = slides.length > 1 && visible && !paused && !keyboardFocused && !reducedMotion;

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setReducedMotion(media.matches);
    const updateVisibility = () => setVisible(!document.hidden);
    const useKeyboard = () => { pointerFocus.current = false; };
    updateMotion();
    updateVisibility();
    media.addEventListener("change", updateMotion);
    document.addEventListener("visibilitychange", updateVisibility);
    document.addEventListener("keydown", useKeyboard, true);
    return () => {
      media.removeEventListener("change", updateMotion);
      document.removeEventListener("visibilitychange", updateVisibility);
      document.removeEventListener("keydown", useKeyboard, true);
    };
  }, []);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => setIndex(current => (current + 1) % slides.length), INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [playing, slides.length, index]);

  function selectImage(nextIndex: number) {
    setIndex((nextIndex + slides.length) % slides.length);
  }

  if (!slides.length) return null;

  return (
    <div
      className="relative min-w-0"
      role="region"
      aria-roledescription={c.carousel}
      aria-label={c.gallery}
      // Touch focus can arrive after pointerup; retain pointer mode until a key is used.
      onPointerDownCapture={() => { pointerFocus.current = true; setKeyboardFocused(false); }}
      onKeyDownCapture={() => setKeyboardFocused(true)}
      onFocusCapture={() => { if (!pointerFocus.current) setKeyboardFocused(true); }}
      onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setKeyboardFocused(false); }}
    >
      <div className="relative h-[320px] overflow-hidden bg-white sm:h-[420px] lg:h-[470px]" id={id} aria-live={paused || keyboardFocused ? "polite" : "off"}>
        {slides.map((slide, slideIndex) => (
          <div
            className={`absolute inset-0 transition-opacity duration-300 motion-reduce:transition-none ${slideIndex === activeIndex ? "opacity-100" : "pointer-events-none opacity-0"}`}
            role="group"
            aria-roledescription={c.slide}
            aria-label={`${slideIndex + 1} / ${slides.length}`}
            aria-hidden={slideIndex !== activeIndex}
            key={slide.src}
          >
            <Image className="h-full w-full object-contain" src={slide.src} alt={slide.alt} width={slide.width} height={slide.height} sizes="(min-width: 1280px) 520px, (min-width: 1024px) 45vw, 90vw" priority={slideIndex === 0} loading={slideIndex === 0 ? undefined : "eager"} />
          </div>
        ))}
      </div>

      {slides.length > 1 ? (
        <div className="mt-4 flex justify-center gap-2 border-t border-line pt-4">
          {slides.map((slide, slideIndex) => (
            <button
              className={`h-12 w-16 overflow-hidden rounded border-2 bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${slideIndex === activeIndex ? "border-accent" : "border-line hover:border-steel"}`}
              type="button"
              aria-label={`${c.show} ${slideIndex + 1}: ${slide.alt}`}
              aria-pressed={slideIndex === activeIndex}
              aria-controls={id}
              title={slide.alt}
              onClick={() => selectImage(slideIndex)}
              key={slide.src}
            >
              <Image className="h-full w-full object-contain" src={slide.src} alt="" width={96} height={64} sizes="64px" />
            </button>
          ))}
          <button className="sr-only focus:not-sr-only focus:absolute focus:right-2 focus:top-2 focus:z-10 focus:grid focus:h-11 focus:w-11 focus:place-items-center focus:rounded focus:border focus:border-line focus:bg-white focus:text-steel focus:outline focus:outline-2 focus:outline-accent" type="button" aria-label={paused ? c.play : c.pause} title={paused ? c.play : c.pause} disabled={reducedMotion} onClick={() => { setPaused(current => !current); setKeyboardFocused(false); }}>
            {paused ? <Play className="h-5 w-5" aria-hidden="true" /> : <Pause className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      ) : null}
    </div>
  );
}
