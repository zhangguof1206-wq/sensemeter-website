"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Locale } from "@/data/catalog";
import { localizedPath, t } from "@/lib/i18n";

const STORAGE_KEY = "sense-cookie-choice";

export function CookieBanner({ locale }: { locale: Locale }) {
  const c = t(locale);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(!window.localStorage.getItem(STORAGE_KEY));
  }, []);

  function saveChoice(value: "accepted" | "necessary") {
    window.localStorage.setItem(STORAGE_KEY, value);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-3 bottom-3 z-50 rounded border border-line bg-white px-4 py-3 shadow-[0_-18px_40px_rgba(24,39,54,0.16)] md:inset-x-0 md:bottom-0 md:rounded-none md:px-8 md:py-4">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <p className="max-w-4xl text-xs leading-5 text-muted md:text-sm">
          {c.cookieBannerText}{" "}
          <Link className="font-bold text-accent" href={localizedPath(locale, "/cookie-policy")}>
            {c.cookieLearnMore}
          </Link>
        </p>
        <div className="grid shrink-0 grid-cols-2 gap-2">
          <button className="btn btn-outline !px-3 !py-2 text-xs md:!px-4 md:text-sm" type="button" onClick={() => saveChoice("necessary")}>
            {c.cookieNecessary}
          </button>
          <button className="btn btn-primary !px-3 !py-2 text-xs md:!px-4 md:text-sm" type="button" onClick={() => saveChoice("accepted")}>
            {c.cookieAccept}
          </button>
        </div>
      </div>
    </div>
  );
}
