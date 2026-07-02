"use client";

import { useEffect, useRef, type AnchorHTMLAttributes } from "react";

const YANDEX_METRICA_ID = 110136437;

export const METRICA_GOALS = {
  rfqSubmitSuccess: "rfq_submit_success",
  pdfDownload: "pdf_download",
  telegramClick: "telegram_click",
  emailClick: "email_click",
  productPageDwell: "product_page_60s"
} as const;

type GoalName = (typeof METRICA_GOALS)[keyof typeof METRICA_GOALS];
type GoalParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    ym?: (counterId: number, method: "reachGoal", goal: GoalName, params?: GoalParams) => void;
  }
}

export function reachMetricaGoal(goal: GoalName, params?: GoalParams) {
  if (typeof window === "undefined" || typeof window.ym !== "function") return;
  window.ym(YANDEX_METRICA_ID, "reachGoal", goal, params);
}

type MetricaTrackedLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  goal: GoalName;
  goalParams?: GoalParams;
};

export function MetricaTrackedLink({ goal, goalParams, onClick, children, ...props }: MetricaTrackedLinkProps) {
  return (
    <a
      {...props}
      onClick={(event) => {
        onClick?.(event);
        reachMetricaGoal(goal, goalParams);
      }}
    >
      {children}
    </a>
  );
}

export function ProductDwellGoal({ slug, model }: { slug: string; model: string }) {
  const sentRef = useRef(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (sentRef.current) return;
      sentRef.current = true;
      reachMetricaGoal(METRICA_GOALS.productPageDwell, { slug, model });
    }, 60000);

    return () => window.clearTimeout(timer);
  }, [slug, model]);

  return null;
}
