"use client";

import { useState, type FormEvent } from "react";
import { products, type Locale } from "@/data/catalog";
import { localizedPath, t } from "@/lib/i18n";

function encodeFormData(form: HTMLFormElement) {
  const formData = new FormData(form);
  return new URLSearchParams(formData as unknown as Record<string, string>).toString();
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

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");

    try {
      const response = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encodeFormData(form)
      });

      if (!response.ok) {
        throw new Error("Form submission failed");
      }

      window.location.href = localizedPath(locale, "/thank-you");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form
      className="card grid gap-4 p-7"
      name="rfq"
      method="POST"
      action={localizedPath(locale, "/thank-you")}
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
    >
      <input type="hidden" name="form-name" value="rfq" />
      <input className="hidden" name="bot-field" tabIndex={-1} autoComplete="off" />
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
      {status === "error" ? (
        <p className="rounded border border-accent/30 bg-accent/10 px-4 py-3 text-sm text-accent">
          {locale === "ru" ? "Не удалось отправить форму. Пожалуйста, попробуйте еще раз." : "The form could not be sent. Please try again."}
        </p>
      ) : null}
      <button className="btn btn-primary w-full md:w-60" type="submit" disabled={status === "sending"}>
        {status === "sending" ? (locale === "ru" ? "Отправка..." : "Sending...") : c.submit}
      </button>
    </form>
  );
}
