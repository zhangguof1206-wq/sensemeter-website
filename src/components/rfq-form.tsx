"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { products, type Locale } from "@/data/catalog";
import { localizedPath, t } from "@/lib/i18n";

const FORM_NAME = "rfq-main";
const FORM_ARCHIVE_ENDPOINT = "/__forms.html";
const FORM_EMAIL_ENDPOINT = "/api/rfq-email";
const EMAIL_TIMEOUT_MS = 25000;
const CONTACT_METHODS = ["Phone", "WhatsApp", "Telegram"] as const;

function encodeFormData(form: HTMLFormElement) {
  return new URLSearchParams(new FormData(form) as unknown as Record<string, string>).toString();
}

function reportRfqSubmitSuccess() {
  const ym = (window as typeof window & { ym?: (...args: unknown[]) => void }).ym;
  ym?.(110136437, "reachGoal", "rfq_submit_success");
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  defaultValue
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  defaultValue?: string;
}) {
  const id = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  return (
    <div>
      <label className="mb-2 block font-bold" htmlFor={id}>
        {label}
      </label>
      <input className="w-full rounded border border-line px-3 py-3" id={id} name={name} type={type} required={required} defaultValue={defaultValue} />
    </div>
  );
}

export function RfqForm({ locale, model, application }: { locale: Locale; model?: string; application?: string }) {
  const c = t(locale);
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const errorCopy = {
    notConfigured:
      locale === "ru"
        ? "Отправка email пока не настроена. Пожалуйста, отправьте запрос напрямую на sales@sensemeter.ru."
        : "Email delivery is not configured yet. Please email sales@sensemeter.ru directly.",
    failed:
      locale === "ru"
        ? "Не удалось отправить RFQ. Пожалуйста, отправьте запрос напрямую на sales@sensemeter.ru."
        : "Email delivery failed. Please email sales@sensemeter.ru directly.",
    timeout:
      locale === "ru"
        ? "Отправка заняла слишком много времени. Пожалуйста, попробуйте еще раз или напишите на sales@sensemeter.ru."
        : "Email delivery timed out. Please try again or email sales@sensemeter.ru directly."
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const body = encodeFormData(form);
    setStatus("sending");
    setErrorMessage("");

    try {
      fetch(FORM_ARCHIVE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body
      }).catch(() => null);

      const controller = new AbortController();
      const timeout = window.setTimeout(() => controller.abort(), EMAIL_TIMEOUT_MS);
      const emailResponse = await fetch(FORM_EMAIL_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
        signal: controller.signal
      });
      window.clearTimeout(timeout);

      if (!emailResponse.ok) {
        throw new Error(emailResponse.status === 503 ? errorCopy.notConfigured : errorCopy.failed);
      }

      reportRfqSubmitSuccess();
      window.location.href = localizedPath(locale, "/thank-you");
    } catch (error) {
      const message = error instanceof DOMException && error.name === "AbortError" ? errorCopy.timeout : error instanceof Error ? error.message : errorCopy.failed;
      setErrorMessage(message);
      setStatus("error");
    }
  }

  return (
    <form
      className="card grid gap-4 p-7"
      name={FORM_NAME}
      method="POST"
      action={localizedPath(locale, "/thank-you")}
      data-netlify="true"
      onSubmit={handleSubmit}
    >
      <input type="hidden" name="form-name" value={FORM_NAME} />
      <Field label={`${c.formEmail} *`} name="Email" type="email" required />
      <div className="grid gap-4 md:grid-cols-2">
        <Field label={c.formName} name="Name" />
        <Field label={c.formCompany} name="Company" />
        <Field label={c.formCountryCity} name="Country / City" />
        <fieldset className="field min-w-0">
          <legend className="sr-only">{c.formContactMethod}</legend>
          <div className="mb-2 grid h-7 grid-cols-3 overflow-hidden rounded border border-line">
            {CONTACT_METHODS.map((method, index) => (
              <label
                className={`cursor-pointer ${index < CONTACT_METHODS.length - 1 ? "border-r border-line" : ""}`}
                key={method}
              >
                <input className="peer sr-only" name="Contact Method" type="radio" value={method} />
                <span className="flex h-full items-center justify-center px-1 text-xs font-bold text-ink transition-colors peer-checked:bg-[#1f3044] peer-checked:text-white peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-[-2px] peer-focus-visible:outline-[#52657a]">
                  {method}
                </span>
              </label>
            ))}
          </div>
          <input
            className="min-h-12 w-full rounded border border-line px-3 py-3"
            id="contactDetails"
            name="Contact Details"
            type="text"
            placeholder={c.formContactDetails}
            aria-label={c.formContactDetails}
          />
        </fieldset>
        <div className="field">
          <label className="mb-2 block font-bold" htmlFor="productModel">
            {c.formProductModel}
          </label>
          <select className="w-full rounded border border-line px-3 py-3" id="productModel" name="Product Model" defaultValue={model || ""}>
            <option value="">{c.formSelectProduct}</option>
            {products.map((product) => (
              <option value={product.model} key={product.slug}>
                {product.model}
              </option>
            ))}
            <option value="Other">Other</option>
          </select>
        </div>
        <Field label={c.formQuantity} name="Quantity" type="number" />
        <Field label={c.formApplication} name="Application" defaultValue={application} />
      </div>
      <div>
        <label className="mb-2 block font-bold" htmlFor="message">
          {c.formMessage}
        </label>
        <textarea className="min-h-36 w-full rounded border border-line px-3 py-3" id="message" name="Message" />
      </div>
      <label className="flex gap-3 rounded border border-line bg-[#f8fafc] p-4 text-sm text-muted">
        <input className="mt-1 h-4 w-4 shrink-0 accent-red-700" type="checkbox" name="Personal Data Consent" value="Accepted" required />
        <span>
          {c.consentCheckbox}{" "}
          <Link className="font-bold text-accent" href={localizedPath(locale, "/privacy")}>
            {c.consentPrivacyLink}
          </Link>{" "}
          {locale === "ru" ? "и" : "and"}{" "}
          <Link className="font-bold text-accent" href={localizedPath(locale, "/personal-data-consent")}>
            {c.consentDataLink}
          </Link>
          .
        </span>
      </label>
      {status === "error" ? (
        <p className="rounded border border-accent/30 bg-accent/10 px-4 py-3 text-sm text-accent">
          {errorMessage || "The form could not be sent. Please try again."}
        </p>
      ) : null}
      <button className="btn btn-primary w-full md:w-60" type="submit" disabled={status === "sending"}>
        {status === "sending" ? c.sending : c.submit}
      </button>
    </form>
  );
}
