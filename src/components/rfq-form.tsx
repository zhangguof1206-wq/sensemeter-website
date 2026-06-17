"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { products, type Locale } from "@/data/catalog";
import { localizedPath, t } from "@/lib/i18n";

const FORM_NAME = "rfq-main";
const FORM_ARCHIVE_ENDPOINT = "/__forms.html";
const FORM_EMAIL_ENDPOINT = "/api/rfq-email";

function encodeFormData(form: HTMLFormElement) {
  return new URLSearchParams(new FormData(form) as unknown as Record<string, string>).toString();
}

function Field({
  label,
  name,
  type = "text",
  required = false
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  const id = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  return (
    <div>
      <label className="mb-2 block font-bold" htmlFor={id}>
        {label}
      </label>
      <input className="w-full rounded border border-line px-3 py-3" id={id} name={name} type={type} required={required} />
    </div>
  );
}

export function RfqForm({ locale, model }: { locale: Locale; model?: string }) {
  const c = t(locale);
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const body = encodeFormData(form);
    setStatus("sending");
    setErrorMessage("");

    try {
      const archiveRequest = fetch(FORM_ARCHIVE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body
      }).catch(() => null);

      const emailResponse = await fetch(FORM_EMAIL_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body
      });

      if (!emailResponse.ok) {
        const message =
          emailResponse.status === 503
            ? "Email delivery is not configured yet. The request was saved in Netlify Forms."
            : "Email delivery failed. The request was saved in Netlify Forms.";
        throw new Error(message);
      }

      const archiveResponse = await archiveRequest;
      if (archiveResponse && !archiveResponse.ok) {
        console.warn("RFQ backup archive failed.");
      }

      window.location.href = localizedPath(locale, "/thank-you");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "The form could not be sent. Please try again.");
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
        <Field label={c.formPhone} name="Phone / WhatsApp / Telegram" />
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
          </select>
        </div>
        <Field label={c.formQuantity} name="Quantity" type="number" />
        <Field label={c.formApplication} name="Application" />
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
