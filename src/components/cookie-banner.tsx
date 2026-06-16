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
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-white px-5 py-4 shadow-[0_-18px_40px_rgba(24,39,54,0.16)] md:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="max-w-4xl text-sm text-muted">
          {c.cookieBannerText}{" "}
          <Link className="font-bold text-accent" href={localizedPath(locale, "/cookie-policy")}>
            {c.cookieLearnMore}
          </Link>
        </p>
        <div className="flex flex-wrap gap-2">
          <button className="btn btn-outline" type="button" onClick={() => saveChoice("necessary")}>
            {c.cookieNecessary}
          </button>
          <button className="btn btn-primary" type="button" onClick={() => saveChoice("accepted")}>
            {c.cookieAccept}
          </button>
        </div>
      </div>
    </div>
  );
}
